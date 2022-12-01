import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import TwoColwAvatar from '@/components/TwoColwAvatar'
import { client } from '@/lib/client'
import { getCareers } from '@/utils/queries'
import React from 'react'

export default function Careers({ opportunities }) {
  return (
    <div className="h-screen bg-gray-100">
      <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
        <main className="flex-1">
          <Header title="Careers" />
          <div className="mx-h-screen relative mx-auto max-w-4xl md:px-8 xl:px-0">
            <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
              <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Provide business support to start-up’s and established MSMEs
                  in form of capacity building and training, on-the-job
                  coaching, mentorship and hands-on advisory services.
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
  const query = getCareers()
  const opportunities = await client.fetch(query)

  return {
    props: { opportunities },
  }
}
