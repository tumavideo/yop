import { client } from '@/lib/client'
import React, { useState } from 'react'

import { useSession } from 'next-auth/react'
import OppApplication from '@/components/OppApplication'
import JobInfo from '@/components/JobInfo'

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
  const [activeJob, setActiveJob] = useState({})
  const { data: session } = useSession()

  return (
    <>
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <JobInfo job={market} />
            {session && <OppApplication farmer={false} user={session.user} />}
          </div>
        </div>
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
