export function capitalizeString(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * 
 * @param {string} text 
 * @returns string
 */
export function toSnakeCase(text) {
    let result = text;
    result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                 .map(x => x.toLowerCase())
                 .join('_');
    return result;
}