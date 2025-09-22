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
import { z, type ZodType } from 'zod';

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
 * [ASYNC] Read validated data at `/{root}/{uid}/{document=**}` using a Zod schema.
 *
 * @template T - inferred from the provided Zod schema
 *
 * @param schema - Zod schema that defines and validates the expected shape
 * @param root - root collection/table (e.g., "allergies")
 * @param documentPath - trailing document path under the user (e.g., "type/solid")
 *
 * @return - the validated data if the document exists; otherwise `undefined`
 *
 * @throws {Error} if no Firebase user, Firestore access fails, or validation fails
 *
 * @usage
 * ```ts
 * const Allergy = z.object({ kind: z.enum(['solid','liquid']), name: z.string() });
 * const data = await readCloudData(Allergy, 'allergies', 'type/solid'); // typed as inferred from schema
 * ```
 ******************************************************************************************************************/
export async function readCloudData<T>(
  schema: ZodType<T>,
  root: string,
  documentPath: string | string[],
): Promise<T | undefined> {
  const db = getFirestore(getApp());
  const ref = doc(db, userScopedPath(root, documentPath));
  const snap = await getDoc(ref);
  if (!snap.exists()) return undefined;
  const parsed = schema.parse(snap.data()); // throws with a readable ZodError if shape mismatches
  return parsed;
}

/******************************************************************************************************************
 * [ASYNC] Create or replace/merge data at `/{root}/{uid}/{document=**}` with `_updatedAt`, validated by Zod.
 *
 * NOTE: To keep the manager simple and safe, we validate the FULL object by default.
 *       If you want partial updates, pass a schema.partial() explicitly.
 *
 * @template T - inferred from the provided Zod schema
 *
 * @param schema - Zod schema that defines and validates the data being written
 * @param root - root collection/table (e.g., "allergies")
 * @param documentPath - trailing document path under the user (e.g., ["type","solid"])
 * @param data - data to be written; must satisfy `schema` (or `schema.partial()` if you choose)
 * @param merge? - if true (default), merges fields; if false, replaces the document
 *
 * @throws {Error} if no Firebase user, Firestore access fails, or validation fails
 *
 * @usage
 * ```ts
 * const Allergy = z.object({ name: z.string(), kind: z.enum(['solid','liquid']) });
 * await updateCloudData(Allergy, 'allergies', ['type','solid'], { name: 'Peanuts', kind: 'solid' });
 *
 * // For partial merges, call with Allergy.partial()
 * await updateCloudData(Allergy.partial(), 'allergies', ['type','solid'], { name: 'Tree Nuts' }, true);
 * ```
 ******************************************************************************************************************/
export async function updateCloudData<T extends object>(
  schema: ZodType<T>,
  root: string,
  documentPath: string | string[],
  data: T,
  merge: boolean = true,
): Promise<void> {
  const db = getFirestore(getApp());
  const ref = doc(db, userScopedPath(root, documentPath));
  const parsed = schema.parse(data); // throws if invalid
  await setDoc(ref, { ...parsed, _updatedAt: serverTimestamp() } as any, { merge });
}

/******************************************************************************************************************
 * [ASYNC] Delete data at `/{root}/{uid}/{document=**}`.
 *
 * @param root - root collection/table (e.g., "allergies")
 * @param documentPath - trailing document path under the user (e.g., "type/solid")
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
