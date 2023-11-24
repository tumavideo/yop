export const showToast = (title, message) => {
  const toastElement = document.createElement("div");
  toastElement.className =
    "fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50";

  toastElement.innerHTML = `
      <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
        <div class="rounded-lg shadow-xs overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
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

  document.body.appendChild(toastElement);

  setTimeout(() => {
    document.body.removeChild(toastElement);
  }, 3000);
};
