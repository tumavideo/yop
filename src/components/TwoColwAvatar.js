import { urlFor } from '@/lib/client'
import { classNames, convertDate } from '@/lib/utils'

export default function TwoColwAvatar({ opportunities }) {
  return (
    <div className="TwoColwAvatar">
      <ul role="list" className="divide-y divide-gray-200">
        {opportunities.map((opportunity) => (
          <li key={opportunity._id}>
            <a
              href={`/job/${opportunity._id}`}
              className="block hover:bg-gray-50"
            >
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  {opportunity.companyRef.logo && (
                    <div className="flex-shrink-0">
                      <img
                        src={urlFor(opportunity.companyRef.logo.asset)}
                        className="h-12 w-12 rounded-full"
                        alt="mugshot"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-indigo-600">
                        {opportunity.title}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        {/* <EnvelopeIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        /> */}
                        <span className="truncate">
                          {opportunity.companyRef.company}
                        </span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Posted on{' '}
                          <time dateTime={'opportunity.date'}>
                            {convertDate(opportunity._createdAt)}
                          </time>
                        </p>
                        <p
                          className={classNames(
                            (opportunity.status === 'rejected' &&
                              'mt-2 flex items-center text-sm text-red-500') ||
                              (opportunity.status === 'accepted' &&
                                'mt-2 flex items-center text-sm text-green-500') ||
                              (opportunity.status === 'pending' &&
                                'mt-2 flex items-center text-sm text-yellow-500') ||
                              'mt-2 flex items-center text-sm text-gray-500'
                          )}
                        >
                          {/* <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          /> */}
                          {opportunity.status || 'N/A'}
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
