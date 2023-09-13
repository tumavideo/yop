export default function Nothing() {
  return (
    <div>
      <div className="text-center">
        {/* <h3 className="mt-2 text-sm font-semibold text-gray-900"> */}
        <h3 className="text-3xl font-bold tracking-tight text-gray-900">
          No Services
        </h3>
        {/* <p className="mt-1 text-sm text-gray-500"> */}
        <p className="mt-4 text-sm text-gray-700">
          Sign in to see available services.
        </p>
        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {/* <!-- <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" /> --> */}
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
