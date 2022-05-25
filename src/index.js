export const compare = (prev = {}, next = {}) => {
  const isObject = (val) => typeof val === "object" && val;

  const isArrayWithObjects = (array) => {
    let res = null;
    if (Array.isArray(array)) {
      res = array.some((element) => {
        if (typeof element === "object") {
          return true;
        }
      });
    } else {
      return false;
    }
    return res;
  };
  const isArrayWithouObjects = (array) => {
    let res = null;
    if (Array.isArray(array)) {
      res = array.some((element) => {
        if (typeof element === "number" || "string" || "boolean") {
          return true;
        }
      });
    } else {
      return false;
    }
    return res;
  };

  const output = {},
    merged = { ...prev, ...next };
  for (const key in merged) {
    const value1 = prev[key],
      value2 = next[key];
    if (isArrayWithObjects(value1) || isArrayWithObjects(value2)) {
      let object1 = {};
      let object2 = {};
      value1.forEach((item1) => {
        return (object1 = item1);
      });
      if (value2 !== undefined) {
        value2.forEach((item2) => {
          return (object2 = item2);
        });
        if (value2.length > 1) {
          output[key] = [
            compare(value1[0], value2[0]),
            compare(value1[0], !value2[value2.length - 1])
          ];
        }
      }
      if (value2 === undefined) {
        output[key] = [compare(object1, !object1)];
      }

      if (value2 !== undefined && value1.length === value2.length) {
        output[key] = [compare(object1, object2)];
      }
    } else if (isArrayWithouObjects(value1) || isArrayWithouObjects(value2)) {
      if (value1 === undefined || value2 === undefined) {
        output[key] = true;
      } else {
        output[key] = value1.length !== value2.lengt;
      }
    } else if (isObject(value1) || isObject(value2)) {
      output[key] = compare(value1, value2);
    } else output[key] = value1 !== value2;
  }
  return output;
};
