import { useState } from 'react'

import { client } from '@/lib/client'
import { findCompanies } from '@/utils/queries'
import CompanyDirectory from '@/components/CompanyDirectory'
import CompanyInfo from '@/components/CompanyInfo'

export default function Companies({ companies }) {
  const [activeCompany, setActiveCompany] = useState(companies[0])

  return (
    <>
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Breadcrumb */}
              <nav
                className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
                aria-label="Breadcrumb"
              >
                <a
                  href="#"
                  className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
                >
                  {/* <ChevronLeftIcon className="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                  <span>Directory</span>
                </a>
              </nav>
            </main>
            <CompanyDirectory
              companies={companies}
              setActiveCompany={setActiveCompany}
            />
            <CompanyInfo company={activeCompany} />
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const query = findCompanies()
  const companies = await client.fetch(query)

  return {
    props: { companies },
  }
}
