function strToRgbObj (str) {
    if (typeof str === 'string' || str instanceof String) {
      const arr = str.match(/\d+/g).map(Number);
      return {"r": arr[0], "g": arr[1], "b": arr[2]};
    }
    return str;
}

function rgbObjToStr (arr) {
    if (typeof arr === 'object' || arr instanceof Object) {
        return `rgb(${arr['r']},${arr['g']},${arr['b']})`;
    }
    return arr;
}

export { strToRgbObj, rgbObjToStr };