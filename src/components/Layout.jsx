import React from 'react'
import Head from 'next/head'

import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'

import { classNames } from '@/lib/utils'
import { secondaryNavigation } from '@/utils/navigation'
import { signOut, useSession } from 'next-auth/react'
import Footer from './Footer'
import Sidebar from './Sidebar'
import assets from '@/images/assets'
import Image from 'next/image'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <div className="layout">
      <Head>
        <title>
          Youth Opportunities Portal - Your one-stop platform for accessing
          skills, job opportunities, market access, funding, and business and
          career development services.
        </title>
        <meta
          name="description"
          content="Youth Opportunities Portal - Your one-stop platform for accessing skills, job opportunities, market access, funding, and business and career development services."
        />
      </Head>
      <div>
        {session && (
          <>
            <Sidebar
              setSidebarOpen={setSidebarOpen}
              sidebarOpen={sidebarOpen}
            />
          </>
        )}
        {session ? (
          <div className="flex flex-1 flex-col md:pl-64">
            <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Image
                  width={24}
                  height={24}
                  className="h-6 w-6"
                  src={assets.Burger}
                  alt="Menu icon"
                />
              </button>
              <div className="flex flex-1 justify-between px-4">
                <div className="flex flex-1"></div>
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full"
                          src={assets.Avatar}
                          alt="Avatar"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {secondaryNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item key={'signout'}>
                          <a
                            href={'#'}
                            className={classNames(
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={signOut}
                          >
                            Sign out
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            {children}
          </div>
        ) : (
          <>{children}</>
        )}
      </div>
      <Footer />
    </div>
  )
}
