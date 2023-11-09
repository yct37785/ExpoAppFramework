export const delayPromise = t => new Promise(resolve => setTimeout(resolve, t));

export function minMax(num, min, max) {
  return Math.max(Math.min(num, max), 0);
}

export function bubbleSortObjects(inputArr, getValueFromObj) {
  let len = inputArr.length;
  let checked;
  do {
    checked = false;
    for (let i = 0; i < len - 1; i++) {
      if (getValueFromObj(inputArr[i]) > getValueFromObj(inputArr[i + 1])) {
        let tmp = inputArr[i];
        inputArr[i] = inputArr[i + 1];
        inputArr[i + 1] = tmp;
        checked = true;
      }
    }
  } while (checked);
  return inputArr;
};

export function epochToDDMMYY(epoch) {
  const dateObj = new Date(epoch);
  const yr = (dateObj.getFullYear() % 2000).toString().padStart(2, '0');
  const mth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${day}/${mth}/${yr}`;
}

export function get_ddmmyyyy_hhmmss() {
  const d = new Date();
  const str = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}-${d.getHours().toString().padStart(2, '0')}${d.getMinutes().toString().padStart(2, '0')}${d.getSeconds().toString().padStart(2, '0')}`;
  return str;
}

export function ms_to_hhmmss(ms) {
  const hr = ms / (3600 * 1000);
  const min = Math.floor(ms % (3600 * 1000) / (1000 * 60));
  const s = Math.floor(ms % (60 * 1000) / 1000);
  const str = `${hr.toFixed(0).padStart(2, '0')}:${min.toFixed(0).padStart(2, '0')}:${s.toFixed(0).padStart(2, '0')}`;
  return str;
}

// removes all chars > 2 bytes
export function strToUtf8(str) {
  // https://stackoverflow.com/questions/31698871/er-truncated-wrong-value-for-field-on-saving-some-strings-to-mysql
  return str.replace(/[\u0800-\uFFFF]/g, '');
}

export function capitalizeStr(str) {
  if (str.length < 1) {
    return str.toUpperCase();
  }
  return str[0].toUpperCase() + str.slice(1);
}