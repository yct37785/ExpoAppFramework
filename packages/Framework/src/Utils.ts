/******************************************************************************************************************
 * timeout function with given ms
 ******************************************************************************************************************/
export const withTimeout = <T,>(p: Promise<T>, ms: number) =>
  new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('Google sign-in timed out')), ms);
    p.then(
      v => { clearTimeout(t); resolve(v); },
      e => { clearTimeout(t); reject(e); }
    );
  });