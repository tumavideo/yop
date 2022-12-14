import React from 'react'
// import './StackedList.css'

export default function StackedList({ users }) {
  return (
    <div className="StackedList">
      {/* Stacked list */}
      <ul
        role="list"
        className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0"
      >
        {users.map((user) => (
          <li key={'emily.selman@example.com'}>
            <a href={`/applicant/${user._id}`} className="group block">
              <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full group-hover:opacity-75"
                      src={user.image}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-blue-600">
                        {user.userName}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        {/* <EnvelopeIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      /> */}
                        <span className="truncate">
                          {'emily.selman@example.com'}
                        </span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Applied on{' '}
                          <time dateTime={'2020-07-01T15:34:56'}>
                            {'January 7, 2020'}
                          </time>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          {/* <CheckCircleIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                          aria-hidden="true"
                        /> */}
                          {'Completed phone screening'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {/* <ChevronRightIcon
                  className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
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
