import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import assets from '@/images/assets'
import { sidebarNav } from '@/utils/navigation'
import { classNames } from '@/lib/utils'
import { signIn } from 'next-auth/react'

export default function UnLoggedIn() {
  return (
    <div className="relative bg-gray-50">
      <Popover className="relative bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Youth Opportunities Portal</span>
                <Image
                  width={47}
                  height={47}
                  className="h-6 w-6"
                  src={assets.LogoDark}
                  alt="Youth Opportunity Portal Logo"
                />
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <span className="sr-only">Open menu</span>
                {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
              </Popover.Button>
            </div>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a
                onClick={signIn}
                className="ml-8 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Log in
              </a>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <Image
                      width={47}
                      height={47}
                      className="h-6 w-6"
                      src={assets.LogoDark}
                      alt="Youth Opportunity Portal Logo"
                    />
                  </a>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span className="sr-only">Close menu</span>
                      <Image
                        width={24}
                        height={24}
                        className="h-6 w-6"
                        src={assets.Burger}
                        alt="Menu icon"
                      />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {sidebarNav.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                      >
                        {/* <item.icon
                          className="h-6 w-6 flex-shrink-0 text-blue-600"
                          aria-hidden="true"
                        /> */}
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div>
                  <a
                    onClick={signIn}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      <main className="lg:relative">
        <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">The Portal</span>{' '}
              <span className="block text-blue-600 xl:inline">
                Opportunities for all Zambian Youths
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Your one-stop platform for accessing skills, job opportunites,
              market access, funding, business and career development services.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  onClick={signIn}
                  className="flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-10 md:text-lg"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={assets.YouthOnLaptop}
            alt=""
          />
          <Image
            className={'absolute inset-0 h-full w-full object-cover'}
            src={assets.YouthOnLaptop}
          />
        </div>
      </main>
    </div>
  )
}
