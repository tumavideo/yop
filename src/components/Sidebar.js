import React from 'react'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import assets from '@/images/assets'
import { classNames } from '@/lib/utils'
import { sidebarNav } from '@/utils/navigation'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Sidebar({ setSidebarOpen, sidebarOpen }) {
  const router = useRouter()

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-blue-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <Image
                        width={24}
                        height={24}
                        className="h-6 w-6 text-white"
                        src={assets.Close}
                        alt="Close sidebar"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <Image
                    width={47}
                    height={47}
                    className="h-6 w-6"
                    src={assets.Logo}
                    alt="Youth Opportunity Portal Logo"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {sidebarNav.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          router.pathname == item.href
                            ? 'bg-blue-800 text-white'
                            : 'text-blue-100 hover:bg-blue-600',
                          'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                        )}
                      >
                        <Image
                          width={24}
                          height={24}
                          src={item.icon}
                          alt={item.name}
                          aria-hidden="true"
                        />
                        <span className="ml-3 h-6 w-6 flex-shrink-0">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-blue-700 pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <Image
              width={47}
              height={47}
              className="h-6 w-6"
              src={assets.Logo}
              alt="Youth Opportunity Portal Logo"
            />
          </div>
          <div className="mt-5 flex flex-1 flex-col">
            <nav className="flex-1 space-y-1 px-2 pb-4">
              {sidebarNav.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    router.pathname == item.href
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-100 hover:bg-blue-600',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                  )}
                >
                  <Image
                    width={24}
                    height={24}
                    className="mr-3 h-6 w-6 flex-shrink-0 text-blue-300"
                    src={item.icon}
                    alt={item.name}
                    aria-hidden="true"
                  />
                  <span className="px-4">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
