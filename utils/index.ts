export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getDepartment = (departmentOptions, service) =>
  departmentOptions.find((option) => option.value === service.department);

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const unique = (array) => {
  const uniqueMap = new Map();
  const uniqueArray = [];

  array.forEach((item) => {
    const field = item.field;

    if (!uniqueMap.has(field)) {
      uniqueMap.set(field, true); // Mark as seen
      uniqueArray.push(item);
    }
  });

  return uniqueArray;
};

export const compareArrays = (array1, array2) => {
  // Create a map from array2 for faster lookup
  const valueMap = new Map();
  array2.forEach((item) => {
    valueMap.set(item.value, item);
  });

  // Compare array1 with array2 and build the result
  const resultArray = array1.map((item1) => {
    const value = item1.field;
    if (valueMap.has(value)) {
      // Merge the properties of item1 and item2
      return { ...item1, ...valueMap.get(value) };
    } else {
      return item1; // If no match, keep item1 as is
    }
  });

  return resultArray;
};
