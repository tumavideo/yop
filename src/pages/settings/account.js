import { useState } from 'react'

import { classNames } from '@/lib/utils'
import Breadcrumb from '@/components/Breadcrumb'
import { CogIcon, CreditCardIcon, UserCircleIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'

const user = {
  name: 'Debbie Lewis',
  handle: 'deblewis',
  email: 'debbielewis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
}

const breadcrumbs = [
  { name: 'Settings', href: '/settings', current: false },
  { name: 'Account', href: '/settings/account', current: true },
]

const subNavigation = [
  {
    name: 'Profile',
    href: '/settings',
    icon: UserCircleIcon,
    current: false,
  },
  { name: 'Account', href: '/settings/account', icon: CogIcon, current: true },
  {
    name: 'Plan & Billing',
    href: '#',
    icon: CreditCardIcon,
    current: false,
  },
]

export default function Account() {
  const { data: session } = useSession()

  return (
    <div className="h-full">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <main className="mx-auto max-w-7xl pb-10 lg:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
            <nav className="space-y-1">
              {subNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-50 text-blue-600 hover:bg-white'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? 'text-blue-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Payment details */}
          <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
            <section aria-labelledby="payment-details-heading">
              <form action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="bg-white py-6 px-4 sm:p-6">
                    <div>
                      <h2
                        id="payment-details-heading"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-4 gap-6">
                      <div className="col-span-4 sm:col-span-2">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          defaultValue={session?.user.email}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label
                          htmlFor="phone-number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone number
                        </label>
                        <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          autoComplete="tel"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        >
                          <option />
                          <option>Zambia</option>
                        </select>
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label
                          htmlFor="language"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Language
                        </label>
                        <input
                          type="text"
                          name="language"
                          id="language"
                          autoComplete="tel"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
