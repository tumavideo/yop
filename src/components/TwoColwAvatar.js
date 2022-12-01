import React from 'react'

import { urlFor } from '@/lib/client'

export default function TwoColwAvatar({ opportunities }) {
  console.log(opportunities[0])

  return (
    <div className="TwoColwAvatar">
      <ul role="list" className="divide-y divide-gray-200">
        {opportunities.map((application) => (
          <li key={application.company}>
            <a href={application.href} className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={urlFor(application.logo.asset)}
                      className="h-12 w-12 rounded-full"
                      alt="mugshot"
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-indigo-600">
                        {application.position}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        {/* <EnvelopeIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        /> */}
                        <span className="truncate">
                          {'application.applicant.email'}
                        </span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Applied on{' '}
                          <time dateTime={'application.date'}>
                            {'application.dateFull'}
                          </time>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          {/* <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          /> */}
                          {'application.stage'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {/* <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  /> */}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
