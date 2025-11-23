// Strict no-drift sync with stale-shared removal (no allowlist).
// - Mirror exact versions from root "overrides" into each app's dependencies
// - Preserve app-specific deps (NOT in overrides and NOT previously shared)
// - Remove stale shared deps (deps that were previously shared but no longer in overrides)
// - Maintain "x-sharedDependencies" (alphabetized) for next run
// - Sort dependencies alphabetically

/******************************************************************************************************************
What the script does (per run)

1) Load root overrides
- Reads root/package.json.
- Grabs overrides (this is your single source of truth).
- currentShared = Object.keys(overrides).sort().

2) Scan each app in /apps/*
- For each apps/<AppName>/package.json:
	- existing = dependencies (may contain both shared + app-specific deps).
	- prevShared = x-sharedDependencies (the last run’s shared list; [] on first run).

3) Compute stale shared
- staleShared = prevShared − currentShared.
- These are deps that used to be shared but are no longer in root overrides.
- They will be removed (no allowlist).

4) Build the new dependency map
- Start empty: merged = {}.
- Keep app-specific deps:
	- For each [name, ver] in existing:
		- If name is in currentShared, skip (we’ll add the shared version later).
		- If name is in staleShared, drop it (remove it from the app).
		- Otherwise, copy as-is: merged[name] = ver. (These are app-specific deps.)
- Overlay shared deps from overrides (exact versions):
	- For each [name, ver] in overrides: merged[name] = ver. (This both adds new shared deps and overwrites any drift.)

5) Sort + mark
- Alphabetically sort merged keys → sortedDeps.
- Set x-sharedDependencies = currentShared (sorted) so the next run knows what was “shared” this time.

6) Write only if changed
- Compare previous {dependencies, x-sharedDependencies} with the new ones.
- If different, write package.json back and log added/updated/removed counts for that app.

7) (Outside the script) npm run setup runs
- npm run sync:apps (the script above)
- npm install --package-lock-only (update lockfile to match new manifests)
- npm install (actually install per updated lockfile)

First run vs subsequent runs
- First run (no x-sharedDependencies yet):
	- Nothing is “stale” (prevShared is empty).
	- All root overrides are mirrored into each app (exact versions).
	- Any non-shared deps already in the app stay.
- Subsequent runs:
	- If you remove a shared dep from root overrides, it becomes stale and is deleted from the app on the next sync.
	- If you add a shared dep to root overrides, it gets added to each app with the exact version from overrides.
	- If you bump a version in root overrides, the app gets updated to that exact version.
 ******************************************************************************************************************/
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const appsDir = path.join(root, 'apps');
const rootPkgPath = path.join(root, 'package.json');

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeJson(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n'); }
function sortObjectKeys(obj) {
  return Object.fromEntries(Object.keys(obj || {}).sort().map(k => [k, obj[k]]));
}
function listSubdirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .map(name => path.join(dir, name))
    .filter(p => { try { return fs.statSync(p).isDirectory(); } catch { return false; } });
}

function syncApp(appPath, overrides) {
  const pkgPath = path.join(appPath, 'package.json');
  if (!fs.existsSync(pkgPath)) return { skipped: true, changed: false, removed: [], added: [], updated: [] };

  const appPkg = readJson(pkgPath);
  const existing = appPkg.dependencies || {};
  const prevShared = new Set(appPkg['x-sharedDependencies'] || []);

  const currentShared = Object.keys(overrides).sort();
  const currentSharedSet = new Set(currentShared);

  // stale shared deps = previously shared but no longer in overrides
  const staleShared = [...prevShared].filter(name => !currentSharedSet.has(name));

  const merged = {};
  const removed = [];
  const added = [];
  const updated = [];

  // 1) keep app-specific deps
  for (const [name, ver] of Object.entries(existing)) {
    if (currentSharedSet.has(name)) {
      // will be overwritten by overrides
      continue;
    }
    if (staleShared.includes(name)) {
      removed.push(name);
      continue;
    }
    merged[name] = ver;
  }

  // 2) overlay shared deps with exact versions from overrides
  for (const [name, ver] of Object.entries(overrides)) {
    if (!(name in merged)) {
      if (!(name in existing)) added.push(name);
      else if (existing[name] !== ver) updated.push(name);
    } else if (merged[name] !== ver) {
      updated.push(name);
    }
    merged[name] = ver;
  }

  // 3) sort dependencies
  const sortedDeps = sortObjectKeys(merged);

  // 4) update marker list
  const newSharedList = currentShared;

  // 5) commit if changed
  const before = JSON.stringify({
    dependencies: appPkg.dependencies || {},
    xShared: appPkg['x-sharedDependencies'] || []
  });
  const after = JSON.stringify({
    dependencies: sortedDeps,
    xShared: newSharedList
  });

  const changed = before !== after;
  if (changed) {
    appPkg.dependencies = sortedDeps;
    appPkg['x-sharedDependencies'] = newSharedList;
    writeJson(pkgPath, appPkg);
  }

  return { skipped: false, changed, removed, added, updated };
}

function main() {
  if (!fs.existsSync(rootPkgPath)) {
    console.error('[sync] Root package.json not found:', rootPkgPath);
    process.exit(1);
  }
  const rootPkg = readJson(rootPkgPath);

  // sort root overrides alphabetically & write back if changed
  let overrides = rootPkg.overrides || {};
  const sortedOverrides = sortObjectKeys(overrides);
  if (JSON.stringify(sortedOverrides) !== JSON.stringify(overrides)) {
    rootPkg.overrides = sortedOverrides;
    writeJson(rootPkgPath, rootPkg);
    console.log('[sync] new deps detected, root overrides sorted alphabetically');
  }
  overrides = sortedOverrides;

  console.log(`[sync] mirroring ${Object.keys(overrides).length} overrides into apps (exact versions)...`);

  const apps = listSubdirs(appsDir);
  let scanned = 0, updatedCount = 0;

  for (const appPath of apps) {
    const rel = path.relative(root, appPath);
    const res = syncApp(appPath, overrides);
    if (res.skipped) continue;
    scanned++;
    if (res.changed) {
      updatedCount++;
      const changes = [];
      if (res.added.length) changes.push(`+${res.added.length} added`);
      if (res.updated.length) changes.push(`~${res.updated.length} updated`);
      if (res.removed.length) changes.push(`-${res.removed.length} removed`);
      console.log(`[sync] updated ${rel}${changes.length ? ' (' + changes.join(', ') + ')' : ''}`);
    } else {
      console.log(`[sync] ok      ${rel}`);
    }
  }

  console.log(`[sync] scanned=${scanned} updated=${updatedCount}`);
}

main();
