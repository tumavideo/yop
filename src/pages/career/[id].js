import { client } from '@/lib/client'
import React, { useState } from 'react'

import { useSession } from 'next-auth/react'
import OppApplication from '@/components/OppApplication'
import JobInfo from '@/components/JobInfo'
import CompanyInfo from '@/components/CompanyInfo'

const tabs = [
  {
    name: 'Applied',
    href: '/career/[id]/applicants/',
    count: '2',
    current: false,
    slug: 'applied',
  },
  {
    name: 'Phone Screening',
    href: '/career/[id]/applicants/',
    count: '4',
    current: false,
    slug: 'phone-screening',
  },
  {
    name: 'Interview',
    href: '/career/[id]/applicants/',
    count: '6',
    current: true,
    slug: 'interview',
  },
  {
    name: 'Offer',
    href: '/career/[id]/applicants/',
    current: false,
    slug: 'offer',
  },
  {
    name: 'Disqualified',
    href: '/career/[id]/applicants/',
    current: false,
    slug: 'disqualified',
  },
]

export default function Listing({ career }) {
  const [state, setState] = useState('Job')
  const { data: session } = useSession()

  return (
    <>
      {/* Background color split screen for large screens */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-12">
        {state === 'Job' ? (
          <JobInfo job={career} setState={() => setState('Company')} />
        ) : (
          <CompanyInfo
            company={career.companyRef}
            setState={() => setState('Job')}
          />
        )}
        {session && <OppApplication opportunity={career} user={session.user} />}
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "career"] {
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
  const query = `*[_type == "career" && _id == '${id}'][0]{
    _id,
    _createdAt,
    _type,
    brief,
    description,
    title,
    link,
    companyRef->{bio,company,feature,logo}
  }`
  const career = await client.fetch(query)

  return {
    props: { career },
  }
}
