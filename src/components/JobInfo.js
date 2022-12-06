import { urlFor } from '@/lib/client'
import { classNames } from '@/lib/utils'
import React from 'react'

const tabs = [
  { name: 'Profile', href: '#', current: false },
  { name: 'Jobs', href: '#', current: true },
]
const profile = {
  name: 'United Nations Development Program',
  imageUrl:
    'https://cdn.sanity.io/images/d9p0l1rj/production/f33f7b07f4449668a6f36136217a308a72a2c92d-151x230.png',
  coverImageUrl:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Title: 'Senior Front-End Developer',
    Team: 'Product Development',
    Location: 'Lusaka - Oasis, 4th floor',
    'Company Size': '100',
  },
}

export default function JobInfo({ job }) {
  return (
    <div className="JobInfo p-8">
      <article>
        {/* Profile header */}
        <div>
          <div>
            <img
              className="h-32 w-full object-cover lg:h-48"
              src={
                job.companyRef.feature
                  ? urlFor(job.companyRef.feature.asset)
                  : 'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
              }
              alt=""
            />
          </div>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              {job?.companyRef.logo && (
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
                    {job.company || job.title}
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {job.company || job.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 sm:mt-2 2xl:mt-5">
          <div className="border-b border-gray-200">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Description list */}
        <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Opportunity Description
              </dt>
              <dd
                className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                dangerouslySetInnerHTML={{
                  __html:
                    job.brief ||
                    "Under the direct supervision of the Chief of Health, the incumbent will be responsible for supporting the government in the assessment, designing, planning, adaptation, and deployment of scalable digital health technologies in Zambia's context in alignment with national digital strategies, focusing on addressing bottlenecks in health services delivery. In close collaboration with the UNICEF ESARO, and Digital Health Centre of Excellence (DICE), the incumbent will coordinate and collaborate with in-country digital health partners in Zambia to support the MoH on implementation, monitoring, evaluation, and reporting of Zambia’s Digital Health Strategic Plan 2022–2026. The incumbent will provide technical assistance to map out what are the different areas that digital solutions that could strengthen the health system, facilitate prioritization exercises with government and key stakeholders, and then support the planning and roll-out of one of these interventions based on needs identified, requirements gathered and strong evidence of replicability and scalability.",
                }}
              />
            </div>
            {Object.keys(profile.fields).map((field) => (
              <div key={field} className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">{field}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {profile.fields[field]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </div>
  )
}
