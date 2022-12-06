import { urlFor } from '@/lib/client'
import React from 'react'

export default function CompanyDirectory({ companies, setActiveCompany }) {
  return (
    <div className="CompanyDirectory">
      <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Company Directory
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Search directory of {companies.length} companies
          </p>
          <form className="mt-6 flex space-x-4" action="#">
            <div className="min-w-0 flex-1">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                </div>
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {/* <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        {/* Directory list */}
        <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
          {companies.map((company) => (
            <ul role="list" className="relative z-0 divide-y divide-gray-200">
              <li key={company._id}>
                <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={urlFor(company.logo.asset)}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <a
                      href="#"
                      className="focus:outline-none"
                      onClick={() => setActiveCompany(company)}
                    >
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">
                        {company.company}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {company.bio}
                      </p>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </nav>
      </aside>
    </div>
  )
}
