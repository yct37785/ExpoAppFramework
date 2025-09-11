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

export class AppError extends Error {
  module: string;
  func: string;

  constructor(module: string, func: string, message: string) {
    const formattedMessage =
      `${logColors.red}[${module.charAt(0).toUpperCase() + module.slice(1)}]${logColors.reset} ` +
      `${logColors.yellow}${func}:${logColors.reset} ` +
      message;

    super(formattedMessage);

    this.name = "AppError";
    this.module = module;
    this.func = func;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
