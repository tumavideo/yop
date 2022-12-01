import { classNames } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default function Tabs({ count, opportunity, tabs }) {
  const [activeTab, setActiveTab] = useState(tabs.find((tab) => tab.current))

  const handleTabChange = (event) => {
    if (event.target.value === 'default') return
    const updatedTab = tabs?.find((tab) => tab.name === event.target.value)
    setActiveTab(updatedTab)
  }

  return (
    <div className="Tabs">
      <div className="px-4 sm:px-0">
        <h2 className="text-lg font-medium text-gray-900">Candidates</h2>

        {/* Tabs */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="mt-4 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={activeTab.name}
            onChange={handleTabChange}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={{
                    pathname: tab.href,
                    query: { id: opportunity._id, tab: tab.slug },
                  }}
                  onClick={() => handleTabChange(tab)}
                  className={classNames(
                    tab.current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                  )}
                >
                  {tab.name}
                  {count ? (
                    <span
                      className={classNames(
                        tab.current
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'bg-gray-100 text-gray-900',
                        'ml-2 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block'
                      )}
                    >
                      {count}
                    </span>
                  ) : null}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
