import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

/******************************************************************************************************************
 * Normalize an arbitrary document path into a clean slash-joined string.
 *
 * @param parts - path parts (string or string[]) accepted by public APIs
 *
 * @return - normalized path segment (no leading/trailing slashes)
 *
 * @throws {Error} if no parts are provided after normalization
 ******************************************************************************************************************/
function normalizePath(parts: string | string[]): string {
  const segs = (Array.isArray(parts) ? parts : [parts])
    .flatMap((s) => `${s}`.split('/'))
    .map((s) => s.trim())
    .filter(Boolean);
  if (!segs.length) throw new Error('Invalid document path');
  return segs.join('/');
}

/******************************************************************************************************************
 * Compute the absolute user-scoped path: `${root}/${uid}/${documentPath}`.
 *
 * @param root - top-level collection/table name (e.g., "allergies", "todos")
 * @param documentPath - nested path under the user bucket (e.g., "type/solid")
 *
 * @return - absolute Firestore path compliant with security rules
 *
 * @throws {Error} if no authenticated Firebase user is available
 ******************************************************************************************************************/
function userScopedPath(root: string, documentPath: string | string[]): string {
  const uid = getAuth(getApp()).currentUser?.uid;
  if (!uid) throw new Error('No Firebase user found');
  const docPath = normalizePath(documentPath);
  return `${normalizePath(root)}/${uid}/${docPath}`;
}

/******************************************************************************************************************
 * [ASYNC] Read data (schemaless JSON) at `/{root}/{uid}/{document=**}`.
 *
 * @param root - root collection/table (e.g., "allergies")
 * @param documentPath - trailing document path under the user (e.g., "type/solid")
 *
 * @return - plain JSON (Record<string, any>) if the document exists, otherwise `undefined`
 *
 * @throws {Error} if there is no Firebase user or Firestore access fails
 *
 * @usage
 * ```ts
 * const data = await readCloudData('allergies', 'type/solid');
 * if (data) console.log(data.name);
 * ```
 ******************************************************************************************************************/
export async function readCloudData(
  root: string,
  documentPath: string | string[],
): Promise<Record<string, any> | undefined> {
  const db = getFirestore(getApp());
  const ref = doc(db, userScopedPath(root, documentPath));
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as Record<string, any>) : undefined;
}

/******************************************************************************************************************
 * [ASYNC] Create or update data (schemaless JSON) at `/{root}/{uid}/{document=**}`.
 *
 * NOTE:
 * - Accepts full or partial objects. Use `merge=true` (default) for partial updates; set `merge=false` to replace.
 * - An automatic `_updatedAt` server timestamp is included on every write.
 *
 * @param root - root collection/table (e.g., "allergies")
 * @param documentPath - trailing document path under the user (e.g., ["type","solid"])
 * @param data - JSON to write (full or partial)
 * @param merge? - if true (default), merges fields; if false, replaces the document
 *
 * @throws {Error} if there is no Firebase user or Firestore access fails
 *
 * @usage
 * ```ts
 * await updateCloudData('allergies', ['type','solid'], { name: 'Peanuts' }, true); // merge
 * await updateCloudData('allergies', ['type','solid'], { name: 'Almonds', kind: 'solid' }, false); // replace
 * ```
 ******************************************************************************************************************/
export async function updateCloudData(
  root: string,
  documentPath: string | string[],
  data: Record<string, any>,
  merge: boolean = true,
): Promise<void> {
  const db = getFirestore(getApp());
  const ref = doc(db, userScopedPath(root, documentPath));
  await setDoc(ref, { ...data, _updatedAt: serverTimestamp() }, { merge });
}

/******************************************************************************************************************
 * [ASYNC] Delete data at `/{root}/{uid}/{document=**}`.
 *
 * @param root - root collection/table (e.g., "allergies")
 * @param documentPath - trailing document path under the user (e.g., "type/solid")
 *
 * @return - void (resolves when the SDK accepts the delete)
 *
 * @throws {Error} if there is no Firebase user or Firestore access fails
 *
 * @usage
 * ```ts
 * await deleteCloudData('allergies', 'type/solid');
 * ```
 ******************************************************************************************************************/
export async function deleteCloudData(
  root: string,
  documentPath: string | string[],
): Promise<void> {
  const db = getFirestore(getApp());
  const ref = doc(db, userScopedPath(root, documentPath));
  await deleteDoc(ref);
}
