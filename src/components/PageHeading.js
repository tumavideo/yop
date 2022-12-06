import React from 'react'

export default function PageHeading({ opportunity }) {
  return (
    <div className="PageHeading">
      {/* Page heading */}
      <header className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
          <div className="min-w-0 flex-1">
            <nav className="flex" aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-4">
                <li>
                  <div>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      {opportunity?.opportunityType}
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    {/* <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      /> */}
                    <a
                      href="#"
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      {opportunity?.role}
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {opportunity?.position}
            </h1>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                {/* <BriefcaseIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  /> */}
                {opportunity?.contract}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                {/* <MapPinIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  /> */}
                Remote
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                {/* <CalendarIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  /> */}
                Closing on {opportunity?.closingDate}
              </div>
              {opportunity?.bio && (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  Company info: {opportunity.bio}
                </div>
              )}
              {opportunity?.link && (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  Link:{' '}
                  <a href={`${opportunity.link}`} target="_blank">
                    {opportunity.link}
                  </a>
                </div>
              )}
              {opportunity?.role && (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  Role: {opportunity.role}
                </div>
              )}
              {opportunity?.position && (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  Position: {opportunity.position}
                </div>
              )}
              {opportunity?.description && (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  Description: {opportunity.description}
                </div>
              )}
              {opportunity?.responsibilites && (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  Responsibilites: {opportunity.responsibilites}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
