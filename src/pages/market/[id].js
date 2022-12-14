import { client } from '@/lib/client'
import React, { useState } from 'react'

import { useSession } from 'next-auth/react'
import OppApplication from '@/components/OppApplication'
import JobInfo from '@/components/JobInfo'
import CompanyInfo from '@/components/CompanyInfo'

const tabs = [
  {
    name: 'Applied',
    href: '/market/[id]/applicants/',
    count: '2',
    current: false,
    slug: 'applied',
  },
  {
    name: 'Phone Screening',
    href: '/market/[id]/applicants/',
    count: '4',
    current: false,
    slug: 'phone-screening',
  },
  {
    name: 'Interview',
    href: '/market/[id]/applicants/',
    count: '6',
    current: true,
    slug: 'interview',
  },
  {
    name: 'Offer',
    href: '/market/[id]/applicants/',
    current: false,
    slug: 'offer',
  },
  {
    name: 'Disqualified',
    href: '/market/[id]/applicants/',
    current: false,
    slug: 'disqualified',
  },
]

export default function Job({ market }) {
  const [state, setState] = useState('Job')
  const { data: session } = useSession()

  return (
    <>
      {/* Background color split screen for large screens */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-12">
        {state === 'Job' ? (
          <JobInfo job={market} setState={() => setState('Company')} />
        ) : (
          <CompanyInfo
            company={market.companyRef}
            setState={() => setState('Job')}
          />
        )}
        {session && <OppApplication farmer={true} user={session.user} />}
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "market"] {
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
  const query = `*[_type == "market" && _id == '${id}'][0]{
    _id,
    _createdAt,
    _type,
    brief,
    description,
    title,
    companyRef->{bio,company,feature,logo}
  }`
  const market = await client.fetch(query)

  return {
    props: { market },
  }
}
