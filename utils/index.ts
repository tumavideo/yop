export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getDepartment = (departmentOptions, service) =>
  departmentOptions.find((option) => option.value === service.department);
