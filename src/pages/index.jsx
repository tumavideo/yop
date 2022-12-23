import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Router from 'next/router'

import EmptyState from '@/components/EmptyState'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import UnLoggedIn from '@/components/UnLoggedIn'
import { classNames } from '@/lib/utils'

export default function Home() {
  const { data: session } = useSession()

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('onboarded'))) {
      if (session) {
        Router.push('/onboarding')
      }
    }
  }, [])

  return (
    <main className="flex-1">
      <div>
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

                <div className="relative pb-16 sm:pb-12">
                  {!session && <UnLoggedIn />}
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
