export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getDepartment = (departmentOptions, service) =>
  departmentOptions.find((option) => option.value === service.department);

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
