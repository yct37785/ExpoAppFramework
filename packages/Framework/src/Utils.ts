import { logColors } from './Const';

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

/******************************************************************************************************************
* logging utility
******************************************************************************************************************/
export function doLog(module: string, func: string, message: string) {
  console.log(
    `${logColors.cyan}[${module.charAt(0).toUpperCase() + module.slice(1)}]${logColors.reset} ` +
    `${logColors.yellow}${func}:${logColors.reset} ` +
    message
  );
};

export function doErrLog(module: string, func: string, message: string) {
  console.log(
    `${logColors.red}[${module.charAt(0).toUpperCase() + module.slice(1)}]${logColors.reset} ` +
    `${logColors.yellow}${func}:${logColors.reset} ` +
    message
  );
};
