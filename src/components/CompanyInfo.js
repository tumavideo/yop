import { urlFor } from '@/lib/client'
import { classNames } from '@/lib/utils'
import React from 'react'

const tabs = [
  { name: 'Profile', href: '#', current: true },
  { name: 'Opportunity', href: '#', current: false },
]

export default function CompanyInfo({ company, setState }) {
  return (
    <>
      <article>
        {/* Profile header */}
        <div>
          <div>
            <img
              className="h-32 w-full object-cover lg:h-48"
              src={
                'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
              }
              alt=""
            />
          </div>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <img
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  src={urlFor(company.logo.asset)}
                  alt=""
                />
              </div>
              <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                  <h1 className="truncate text-2xl font-bold text-gray-900">
                    {company.company}
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {company.company}
              </h1>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 sm:mt-2 2xl:mt-5">
          <div className="border-b border-gray-200">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <a
                    onClick={setState}
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Description list */}
        <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Company Info
              </dt>
              <dd
                className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                dangerouslySetInnerHTML={{ __html: company.bio }}
              />
            </div>
            {company.location && (
              <div key={'companySize'} className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {'Location'}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {company.location}
                </dd>
              </div>
            )}
            {company.companySize && (
              <div key={'companySize'} className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {'Company Size'}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {company.companySize}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </article>
    </>
  )
}
