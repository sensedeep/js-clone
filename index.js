/*
    js-clone - Clone anything
 */

const RECURSE_LIMIT = 75

export function clone(src, recurse = 0) {
    var result

    if (recurse > RECURSE_LIMIT) {
        return
    }
    if (Array.isArray(src)) {
        result = src.slice(0)
    } else if (typeof src == 'object' && !(src instanceof Date || src instanceof RegExp || src == null)) {
        result = Object.create(Object.getPrototypeOf(src))
        var i, descriptor, keys = Object.getOwnPropertyNames(src)
        for (i = 0; i < keys.length; i ++) {
            descriptor = Object.getOwnPropertyDescriptor(src, keys[i])
            if (descriptor.value && typeof descriptor.value === 'object' && keys[i] != '__observers__') {
                descriptor.value = clone(descriptor.value)
            }
            Object.defineProperty(result, keys[i], descriptor)
        }
    } else {
        result = src
    }
    return result
}
