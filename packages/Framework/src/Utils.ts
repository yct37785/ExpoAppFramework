import { logColors } from './Const';

/******************************************************************************************************************
 * [ASYNC] Wrap a promise with a timeout that rejects if it does not settle within the given duration.
 *
 * @template T - type of the wrapped promise result
 *
 * @param p - promise to wrap
 * @param ms - timeout duration in milliseconds
 * @param timeoutMsg - timeout msg
 *
 * @return - a promise that resolves with the same value as p or rejects with timeout error
 *
 * @throws {Error} if the timeout is reached before p settles
 *
 * @usage
 * ```ts
 * const result = await withTimeout(fetchData(), 5000, "op timeout")
 * ```
 ******************************************************************************************************************/
export const withTimeout = <T,>(p: Promise<T>, ms: number, timeoutMsg: string) =>
  new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(timeoutMsg)), ms);
    p.then(
      v => { clearTimeout(t); resolve(v); },
      e => { clearTimeout(t); reject(e); }
    );
  });

/******************************************************************************************************************
 * Log a formatted message to the console with cyan module label and yellow function label.
 *
 * @param module - module name string
 * @param func - function name string
 * @param message - message text to output
 *
 * @usage
 * ```ts
 * doLog('auth', 'login', 'user logged in successfully')
 * ```
 ******************************************************************************************************************/
export function doLog(module: string, func: string, message: string) {
  console.log(
    `${logColors.cyan}[${module.charAt(0).toUpperCase() + module.slice(1)}]${logColors.reset} ` +
    `${logColors.yellow}${func}:${logColors.reset} ` +
    message
  );
};

/******************************************************************************************************************
 * Log an error message to the console with red module label and yellow function label.
 *
 * @param module - module name string
 * @param func - function name string
 * @param message - error text to output
 *
 * @usage
 * ```ts
 * doErrLog('auth', 'login', 'failed to log in')
 * ```
 ******************************************************************************************************************/
export function doErrLog(module: string, func: string, message: string) {
  console.log(
    `${logColors.red}[${module.charAt(0).toUpperCase() + module.slice(1)}]${logColors.reset} ` +
    `${logColors.yellow}${func}:${logColors.reset} ` +
    message
  );
};
