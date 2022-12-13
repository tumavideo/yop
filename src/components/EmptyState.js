import React from 'react'

import { classNames } from '@/lib/utils'
import { sidebarNav } from '@/utils/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function EmptyState() {
  return (
    <div className="EmptyState">
      <div className="mx-auto max-w-lg">
        <h2 className="text-lg font-medium text-gray-900">
          Find your first opportunity
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Get started by selecting which type of opportunity you are looking
          for.
        </p>
        <ul
          role="list"
          className="mt-6 divide-y divide-gray-200 border-t border-b border-gray-200"
        >
          {sidebarNav.map((item, itemIdx) => (
            <li key={itemIdx}>
              <div className="group relative flex items-start space-x-3 py-4">
                <div className="flex-shrink-0">
                  <span
                    className={classNames(
                      item.iconColor,
                      'inline-flex h-10 w-10 items-center justify-center rounded-lg'
                    )}
                  >
                    <Image
                      width={24}
                      height={24}
                      className="h-6 w-6 text-white"
                      src={item.altIcon}
                      alt={item.name}
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    <a href={item.href}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {item.name}
                    </a>
                  </div>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="flex-shrink-0 self-center">
                  {/* <ChevronRightIcon
                    className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  /> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mb-24 mt-6 flex">
          <Link
            href="/partner"
            className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Or create a new opportunity for Zambias youth
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
