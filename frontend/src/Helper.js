function strToRgbObj (str) {
    if (typeof str === 'string' || str instanceof String) {
      const arr = str.match(/\d+/g).map(Number);
      return {"r": arr[0], "g": arr[1], "b": arr[2]};
    }
    return str;
}

function toRgbStr (obj) {
    if (Array.isArray(obj)) {
        return `rgb(${obj[0]},${obj[1]},${obj[2]})`;
    }
    if (typeof obj === 'object' || obj instanceof Object) {
        return `rgb(${obj['r']},${obj['g']},${obj['b']})`;
    }
    return obj;
}

export { strToRgbObj, toRgbStr };