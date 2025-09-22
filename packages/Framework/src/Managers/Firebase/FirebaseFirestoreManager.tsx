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
 * @param parts - path parts (string or string[] accepted by public APIs)
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
  const auth = getAuth(getApp());
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('No Firebase user found');
  const docPath = normalizePath(documentPath);
  return `${normalizePath(root)}/${uid}/${docPath}`;
}

/******************************************************************************************************************
 * [ASYNC] Read typed data from Firestore at `/{root}/{uid}/{document=**}`.
 *
 * @template T - domain type of the stored document (shape of your data)
 *
 * @param root - root collection/table (e.g., "allergies")
 * @param documentPath - trailing document path under the user (e.g., "type/solid")
 *
 * @return - the document data if it exists, otherwise `undefined`
 *
 * @throws {Error} if there is no Firebase user or Firestore access fails
 *
 * @usage
 * ```ts
 * type Allergy = { kind: 'solid' | 'liquid', name: string };
 * const data = await readData<Allergy>('allergies', 'type/solid');
 * ```
 ******************************************************************************************************************/
export async function readCloudData<T = any>(
  root: string,
  documentPath: string | string[],
): Promise<T | undefined> {
  const db = getFirestore(getApp());
  const ref = doc(db, userScopedPath(root, documentPath));
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as T) : undefined;
}

/******************************************************************************************************************
 * [ASYNC] Create or update typed data at `/{root}/{uid}/{document=**}` with an automatic `_updatedAt` timestamp.
 *
 * @template T - domain type of the stored document (shape of your data)
 *
 * @param root - root collection/table (e.g., "allergies")
 * @param documentPath - trailing document path under the user (e.g., ["type","solid"])
 * @param partial - fields to set/merge (use full object for first write)
 * @param merge? - if true (default), merges fields; if false, replaces the document
 *
 * @return - void (completes when the local/remote write is accepted by the SDK)
 *
 * @throws {Error} if there is no Firebase user or Firestore access fails
 *
 * @usage
 * ```ts
 * await updateData('allergies', ['type','solid'], { name: 'Peanuts', kind: 'solid' });
 * await updateData('allergies', 'type/solid', { name: 'Tree Nuts' }, false); // replace
 * ```
 ******************************************************************************************************************/
export async function updateCloudData<T extends object>(
  root: string,
  documentPath: string | string[],
  partial: Partial<T>,
  merge: boolean = true,
): Promise<void> {
  const db = getFirestore(getApp());
  const ref = doc(db, userScopedPath(root, documentPath));
  await setDoc(ref, { ...partial, _updatedAt: serverTimestamp() } as any, { merge });
}

/******************************************************************************************************************
 * [ASYNC] Delete data at `/{root}/{uid}/{document=**}`.
 *
 * @param root - root collection/table (e.g., "allergies")
 * @param documentPath - trailing document path under the user (e.g., "type/solid")
 *
 * @return - void (completes when the local/remote delete is accepted by the SDK)
 *
 * @throws {Error} if there is no Firebase user or Firestore access fails
 *
 * @usage
 * ```ts
 * await deleteData('allergies', 'type/solid');
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
