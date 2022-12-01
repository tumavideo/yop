import { client } from '@/lib/client'
import React from 'react'

import { useRouter } from 'next/router'
import Tabs from '@/components/Tabs'
import Pagination from '@/components/Pagination'
import StackedList from '@/components/StackedList'
import PageHeading from '@/components/PageHeading'

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

export default function Listing({ opportunity, users }) {
  const router = useRouter()

  return (
    <>
      <div className="min-h-full">
        <PageHeading opportunity={opportunity} />
        <main className="pt-8 pb-16">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Tabs count={5} opportunity={opportunity} tabs={tabs} />
            <StackedList users={users} />
            <Pagination />
          </div>
        </main>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "opportunity"] {
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

export const getStaticProps = async ({ params: { id, tab } }) => {
  const query = `*[_type == "opportunity" && _id == '${id}'][0]`
  const usersQuery = `*[_type == "user" && opportunityStatus == '${tab}']`

  const opportunity = await client.fetch(query)
  const users = await client.fetch(usersQuery)

  return {
    props: { opportunity, users },
  }
}
