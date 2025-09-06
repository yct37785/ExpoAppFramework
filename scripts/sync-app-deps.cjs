// Strict "no drift" sync:
// - Preserve all app-specific deps (non-"override")
// - Overlay root overrides -> every shared dep set to "override"
// - Remove stale "override" deps not in overrides (by never adding them)
// - Sort keys alphabetically
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const appsDir = path.join(root, 'apps');
const rootPkgPath = path.join(root, 'package.json');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
}
function sortObjectKeys(obj) {
  return Object.fromEntries(Object.keys(obj || {}).sort().map(k => [k, obj[k]]));
}
function listSubdirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .map(name => path.join(dir, name))
    .filter(p => {
      try { return fs.statSync(p).isDirectory(); } catch { return false; }
    });
}

function syncApp(appPath, overrides) {
  const pkgPath = path.join(appPath, 'package.json');
  if (!fs.existsSync(pkgPath)) return { skipped: true, changed: false };

  const appPkg = readJson(pkgPath);
  const existing = appPkg.dependencies || {};
  const overrideNames = Object.keys(overrides);

  // 1) Start with ONLY non-"override" deps (app-specific)
  const merged = {};
  for (const [name, ver] of Object.entries(existing)) {
    if (ver !== 'override') {
      merged[name] = ver; // preserve app-specific pin/version
    }
  }

  // 2) Overlay overrides -> force shared deps to "override" (eliminate drift)
  for (const name of overrideNames) {
    merged[name] = 'override';
  }

  // 3) Alphabetically sort
  const sorted = sortObjectKeys(merged);

  // 4) Write back if changed
  const before = JSON.stringify(appPkg.dependencies || {});
  const after = JSON.stringify(sorted);
  const changed = before !== after;

  if (changed) {
    appPkg.dependencies = sorted;
    writeJson(pkgPath, appPkg);
  }

  return { skipped: false, changed };
}

function main() {
  if (!fs.existsSync(rootPkgPath)) {
    console.error('[sync] Root package.json not found:', rootPkgPath);
    process.exit(1);
  }
  const rootPkg = readJson(rootPkgPath);
  const overrides = rootPkg.overrides || {};
  const overrideCount = Object.keys(overrides).length;

  console.log(`[sync] enforcing no-drift with ${overrideCount} overrides`);

  const apps = listSubdirs(appsDir);
  let scanned = 0, updated = 0;

  for (const appPath of apps) {
    const rel = path.relative(root, appPath);
    const { skipped, changed } = syncApp(appPath, overrides);
    if (skipped) continue;
    scanned++;
    if (changed) { updated++; console.log(`[sync] updated ${rel}`); }
    else { console.log(`[sync] ok      ${rel}`); }
  }

  console.log(`[sync] scanned=${scanned} updated=${updated}`);
}

main();
