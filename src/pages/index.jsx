import { Fragment } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

import { Popover, Transition } from '@headlessui/react'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import EmptyState from '@/components/EmptyState'
import { sidebarNav } from '@/utils/navigation'
import { classNames } from '@/lib/utils'
import UnLoggedIn from '@/components/UnLoggedIn'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/outline'
import assets from '../images/assets'
import Image from 'next/image'

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="flex-1">
      <div className="py-6">
        <div
          className={classNames(
            session ? 'mx-auto max-w-7xl px-4 sm:px-6 md:px-8' : ''
          )}
        >
          <main>
            <div className="bg-gray-50">
              <div className="relative overflow-hidden">
                <div
                  className="absolute inset-y-0 -z-10 h-full w-full"
                  aria-hidden="true"
                >
                  <div className="relative h-full">
                    <svg
                      className="absolute right-full translate-y-1/3 translate-x-1/4 transform sm:translate-x-1/2 md:translate-y-1/2 lg:translate-x-full"
                      width={404}
                      height={784}
                      fill="none"
                      viewBox="0 0 404 784"
                    >
                      <defs>
                        <pattern
                          id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                          x={0}
                          y={0}
                          width={20}
                          height={20}
                          patternUnits="userSpaceOnUse"
                        >
                          <rect
                            x={0}
                            y={0}
                            width={4}
                            height={4}
                            className="text-gray-200"
                            fill="currentColor"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width={404}
                        height={784}
                        fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
                      />
                    </svg>
                    <svg
                      className="absolute left-full -translate-y-3/4 -translate-x-1/4 transform sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
                      width={404}
                      height={784}
                      fill="none"
                      viewBox="0 0 404 784"
                    >
                      <defs>
                        <pattern
                          id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                          x={0}
                          y={0}
                          width={20}
                          height={20}
                          patternUnits="userSpaceOnUse"
                        >
                          <rect
                            x={0}
                            y={0}
                            width={4}
                            height={4}
                            className="text-gray-200"
                            fill="currentColor"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width={404}
                        height={784}
                        fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative pt-6 pb-16 sm:pb-12">
                  {!session && <UnLoggedIn />}

                  {!session && (
                    <div className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                          <span className="block">The Portal</span>
                          <span className="block text-blue-600">
                            Opportunities for all Zambian Youths
                          </span>
                        </h1>
                        <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                          Your one-stop platform for accessing skills, job
                          opportunites, market access, funding, business and
                          career development services.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {!session ? (
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex flex-col"
                      aria-hidden="true"
                    >
                      <div className="flex-1" />
                      <div className="w-full flex-1 bg-gray-800" />
                    </div>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                      <a href="#" onClick={signIn}>
                        <Image
                          width={1859}
                          height={1347}
                          className="relative rounded-lg shadow-lg"
                          src={assets.DashboardPreview}
                          alt="App screenshot"
                        />
                      </a>
                    </div>
                  </div>
                ) : (
                  <EmptyState />
                )}
              </div>

              {!session && <Testimonials />}
              {!session && <Features />}
            </div>
          </main>
        </div>
      </div>
    </main>
  )
}
