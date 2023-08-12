import StringifySafe from "json-stringify-safe";

export const encodeQueryParameter = (data) => {
  return encodeURIComponent(JSON.stringify(data)); // Use StringifySafe to avoid crash on circular dependencies
};

export const decodeQueryParameter = (query) => {
  return JSON.parse(decodeURIComponent(query));
};
