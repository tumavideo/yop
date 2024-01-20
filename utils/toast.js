const crossSVG = `
<svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
`;
const tickSVG = `
<svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

`;
const warningSVG = `
<svg class="h-6 w-6 text-yellow-500"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
</svg>
`;
const toastTypes = {
  success: tickSVG,
  warning: warningSVG,
  error: crossSVG,
};

export const showToast = (title, message, type = "success", timeout = 2000) => {
  const toastElement = document.createElement("div");

  toastElement.className =
    "fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50";

  toastElement.innerHTML = `
      <div class="toast max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
        <div class="rounded-lg shadow-xs overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                ${toastTypes[type]}
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm leading-5 font-medium text-gray-900">${title}</p>
                <p class="mt-1 text-sm leading-5 text-gray-500">${message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

  const closeToast = () => document.body.removeChild(toastElement);

  toastElement.addEventListener("click", closeToast.bind());

  document.body.appendChild(toastElement);

  if (timeout) {
    setTimeout(() => {
      closeToast();
    }, timeout);
  }
};
