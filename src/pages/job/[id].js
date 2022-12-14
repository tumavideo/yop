import { client } from '@/lib/client'
import React, { useState } from 'react'

import { useSession } from 'next-auth/react'
import OppApplication from '@/components/OppApplication'
import CompanyInfo from '@/components/CompanyInfo'
import JobInfo from '@/components/JobInfo'

const tabs = [
  {
    name: 'Applied',
    href: '/job/[id]/applicants/',
    count: '2',
    current: false,
    slug: 'applied',
  },
  {
    name: 'Phone Screening',
    href: '/job/[id]/applicants/',
    count: '4',
    current: false,
    slug: 'phone-screening',
  },
  {
    name: 'Interview',
    href: '/job/[id]/applicants/',
    count: '6',
    current: true,
    slug: 'interview',
  },
  {
    name: 'Offer',
    href: '/job/[id]/applicants/',
    current: false,
    slug: 'offer',
  },
  {
    name: 'Disqualified',
    href: '/job/[id]/applicants/',
    current: false,
    slug: 'disqualified',
  },
]

export default function Job({ job }) {
  const [state, setState] = useState('Job')
  const { data: session } = useSession()

  return (
    <>
      {/* Background color split screen for large screens */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-12">
        {state === 'Job' ? (
          <JobInfo job={job} setState={() => setState('Company')} />
        ) : (
          <CompanyInfo
            company={job.companyRef}
            setState={() => setState('Job')}
          />
        )}
        {session && <OppApplication opportunity={job} user={session.user} />}
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "job"] {
    _id
  }
  `
  const opportunities = await client.fetch(query)
  const paths = opportunities.map((opportunity) => ({
    params: {
      id: opportunity._id,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params: { id } }) => {
  const query = `*[_type == "job" && _id == '${id}'][0]{
    _id,
    _createdAt,
    _type,
    brief,
    description,
    feature,
    link,
    role,
    position,
    responsibilities,
    title,
    companyRef->{bio,company,feature,logo}
  }`
  const job = await client.fetch(query)

  return {
    props: { job },
  }
}
