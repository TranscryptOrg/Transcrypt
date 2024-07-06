function __copy(isDeep, obj) {
    let result;

    // Handle primitives
    if (obj === null || typeof obj !== "object") return obj;

    // Handle Date
    if (obj instanceof Date) {
        result = new Date();
        result.setTime(obj.getTime());
        return result;
    }

    // Handle Array
    if (obj instanceof Array) {
        result = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            result[i] = isDeep ? __copy(isDeep, obj[i]) : obj[i];
        }
        return result;
    }

    // Handle Object
    if (obj instanceof Object) {
        result = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) result[attr] = isDeep ? __copy(isDeep, obj[attr]) : obj[attr];
        }
        return result;
    }

    throw new Error("Copy not implemented for type ".concat(Object.prototype.toString.call(obj)));
}

export function copy(obj) {
    return __copy(false, obj);
}

export function deepcopy(obj) {
    return __copy(true, obj);
}