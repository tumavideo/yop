import Header from '@/components/Header'
import TwoColwAvatar from '@/components/TwoColwAvatar'
import { client } from '@/lib/client'
import { findJobs } from '@/utils/queries'
import React from 'react'

export default function Jobs({ opportunities }) {
  return (
    <div className="h-screen bg-gray-100">
      <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
        <main className="flex-1">
          <Header />
          <div className="mx-h-screen relative mx-auto max-w-4xl md:px-8 xl:px-0">
            <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
              <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Find jobs and employees. Match interests, work values and
                  skills with the world of work, as well as, hire people that
                  fit your criteria.
                </h3>
              </div>

              <TwoColwAvatar opportunities={opportunities} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = findJobs()
  const opportunities = await client.fetch(query)

  return {
    props: { opportunities },
  }
}
