import React from 'react'

import { HomeIcon } from '@heroicons/react/solid'

export default function Breadcrumb({ breadcrumbs }) {
  return (
    <nav
      className="hidden border-b border-gray-200 bg-white lg:flex"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
      >
        <li className="flex">
          <div className="flex items-center">
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {breadcrumbs.map((item) => (
          <li key={item.name} className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                preserveAspectRatio="none"
                viewBox="0 0 24 44"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <a
                href={item.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
