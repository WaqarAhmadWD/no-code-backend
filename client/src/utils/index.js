
export function stripIdSuffix(key) {
  if (typeof key === 'string' && key.endsWith('_id')) {
    return key.slice(0, -3); // Remove the last 3 characters: "_id"
  }
  return key;
}
export function formatObject(input) {
  
  if (!Array.isArray(input) && typeof input !== "object") {

    return input;
  }

  const excludedKeys = ['created_at', 'updated_at'];

  function formatEntry(obj) {
    return Object.entries(obj)
      .filter(([key]) => !excludedKeys.includes(key) && !key.endsWith('_id'))
      .map(([key, value]) => {
        // If it's a nested object and there's a corresponding *_id field
        const idKey = `${key}_id`;
        if (typeof value === 'object' && value !== null && obj[idKey] !== undefined) {
          // Format the nested object (excluding excluded keys)
          return Object.entries(value)
            .filter(([nestedKey]) => !excludedKeys.includes(nestedKey))
            .map(([nestedKey, nestedValue]) => `${nestedKey}: ${nestedValue}`)
            .join(', ');
        }
        return `${key}: ${value}`;
      })
      .join(', ');
  }

  if (Array.isArray(input)) {
    return input.map(obj => formatEntry(obj)).join(' | ');
  }

  return formatEntry(input);
}
export const notAllowed = ["id","created_at","updated_at"];