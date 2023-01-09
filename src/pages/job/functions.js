import { PaperClipIcon } from '@heroicons/react/solid'

export function CreateCareer({ onChange }) {
  return (
    <>
      <div>
        <h1 className="text-lg font-medium leading-6 text-gray-900">
          Career Listing
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Let’s get started by filling in the information below to create your
          new career listing.
        </p>
      </div>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="title"
            id="title"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Link
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="link"
            id="link"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="company"
            id="company"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="brief"
          className="block text-sm font-medium text-gray-700"
        >
          Career Brief
        </label>
        <div className="mt-1">
          <textarea
            id="brief"
            name="brief"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={''}
            onChange={onChange}
            required={true}
          />
        </div>
      </div>
    </>
  )
}

export function CreateFinance({ onChange }) {
  return (
    <>
      <div>
        <h1 className="text-lg font-medium leading-6 text-gray-900">
          Finance Listing
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Let’s get started by filling in the information below to create your
          new finance listing.
        </p>
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="role"
            id="role"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Link
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="link"
            id="link"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="company"
            id="company"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="brief"
          className="block text-sm font-medium text-gray-700"
        >
          Finance Brief
        </label>
        <div className="mt-1">
          <textarea
            id="brief"
            name="brief"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={''}
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="terms"
          className="block text-sm font-medium text-gray-700"
        >
          Terms & Conditions
        </label>
        <div className="mt-1">
          <textarea
            id="terms"
            name="terms"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={''}
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="requirements"
          className="block text-sm font-medium text-gray-700"
        >
          Collateral/Requirement(s)
        </label>
        <div className="mt-1">
          <textarea
            id="requirements"
            name="requirements"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={''}
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="eligibility"
          className="block text-sm font-medium text-gray-700"
        >
          Eligibility
        </label>
        <div className="mt-1">
          <textarea
            id="eligibility"
            name="eligibility"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={''}
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <dt className="text-sm font-medium text-gray-500">Forms</dt>
        <dd className="mt-1 text-sm text-gray-900">
          <ul
            role="list"
            className="divide-y divide-gray-200 rounded-md border border-gray-200"
          >
            <li
              key={'application.form'}
              className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
            >
              <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span className="ml-2 w-0 flex-1 truncate">
                  Application Form
                </span>
              </div>
              <div className="ml-4 flex-shrink-0">
                <a
                  href={'#'}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Upload
                </a>
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </>
  )
}

export function CreateJob({ onChange }) {
  return (
    <>
      <div>
        <h1 className="text-lg font-medium leading-6 text-gray-900">
          Job Listing
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Let’s get started by filling in the information below to create your
          new job listing.
        </p>
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role/Position/Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="role"
            id="role"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue="Front End Developer"
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Link
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="link"
            id="link"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="company"
            id="company"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue="Crowdsource Creators"
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <div className="mt-1">
          <textarea
            id="description"
            name="description"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={''}
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="responsibilities"
          className="block text-sm font-medium text-gray-700"
        >
          Responsibilities
        </label>
        <div className="mt-1">
          <textarea
            id="responsibilities"
            name="responsibilities"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={''}
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="qualifications"
          className="block text-sm font-medium text-gray-700"
        >
          Qualifications
        </label>
        <div className="mt-1">
          <textarea
            id="qualifications"
            name="qualifications"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={''}
            onChange={onChange}
            required={true}
          />
        </div>
      </div>
    </>
  )
}

export function CreateMarket({ onChange }) {
  return (
    <>
      <div>
        <h1 className="text-lg font-medium leading-6 text-gray-900">
          Market Listing
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Let’s get started by filling in the information below to create your
          new market listing.
        </p>
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="role"
            id="role"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Link
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="link"
            id="link"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="company"
            id="company"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="brief"
          className="block text-sm font-medium text-gray-700"
        >
          Market Brief
        </label>
        <div className="mt-1">
          <textarea
            id="brief"
            name="brief"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={''}
            onChange={onChange}
            required={true}
          />
        </div>
      </div>
    </>
  )
}

export function CreateSkill({ onChange }) {
  return (
    <>
      <div>
        <h1 className="text-lg font-medium leading-6 text-gray-900">
          Skills Listing
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Let’s get started by filling in the information below to create your
          new skills listing.
        </p>
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="role"
            id="role"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Link
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="link"
            id="link"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="company"
            id="company"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue=""
            onChange={onChange}
            required={true}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="brief"
          className="block text-sm font-medium text-gray-700"
        >
          Skill Brief
        </label>
        <div className="mt-1">
          <textarea
            id="brief"
            name="brief"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue={''}
            onChange={onChange}
            required={true}
          />
        </div>
      </div>
    </>
  )
}
