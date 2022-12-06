import { client } from '@/lib/client'
import React, { useState } from 'react'

import { useSession } from 'next-auth/react'
import OppApplication from '@/components/OppApplication'
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

export default function Listing({ job }) {
  const [activeJob, setActiveJob] = useState({
  })
  const { data: session } = useSession()

  return (
    <>
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <JobInfo
              job={{
                company: 'Nutrition Specialist (P3), Lusaka, Zambia',
                bio: 'bio',
              }}
            />
            {session && <OppApplication user={session.user} />}
          </div>
        </div>
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
  const query = `*[_type == "job" && _id == '${id}'][0]`
  const job = await client.fetch(query)

  return {
    props: { job },
  }
}
