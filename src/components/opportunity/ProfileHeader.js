import { useState } from 'react'
import { urlFor } from '@/lib/client'
import Modal from '../Modal'

export default function ProfileHeader({ company = {}, handlePress, job = {} }) {
  const [overlay, setOverlay] = useState(false)
  const showModal = () => {
    setOverlay(true)
  }

  return (
    <div className="ProfileHeader">
      {overlay && (
        <Modal
          body={'Make sure the information entered is accurate and complete.'}
          button={'OK'}
          title={'Please fill out the form'}
        />
      )}
      {/* Profile header */}
      <div>
        <div>
          <img
            className="h-32 w-full object-cover lg:h-48"
            src={
              'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            }
            alt="Company feature asset"
          />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            {company.logo && (
              <div className="flex">
                <img
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  src={urlFor(company.logo.asset)}
                  alt=""
                />
              </div>
            )}
            {job.companyRef?.logo && (
              <div className="flex">
                <img
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  src={urlFor(job.companyRef.logo.asset)}
                  alt=""
                />
              </div>
            )}
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                <h1 className="truncate text-2xl font-bold text-gray-900">
                  {company.company ||
                    job.position ||
                    job.role ||
                    job.companyRef.company}
                </h1>
              </div>
              <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => {
                    showModal()
                    handlePress('Application')
                  }}
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {company.company || job.company || job.title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
