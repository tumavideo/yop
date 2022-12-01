import { client } from '@/lib/client'
import React from 'react'

import Tabs from '@/components/Tabs'
import StackedList from '@/components/StackedList'
import Pagination from '@/components/Pagination'
import PageHeading from '@/components/PageHeading'
import { useSession } from 'next-auth/react'
import OppApplication from '@/components/OppApplication'

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
  const { data: session } = useSession()

  return (
    <>
      <div className="min-h-full">
        <PageHeading opportunity={opportunity} />
        <main className="pt-8 pb-16">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {session?.user?.isAdmin ? (
              <>
                <Tabs count={5} opportunity={opportunity} tabs={tabs} />
                <StackedList users={users} />
                <Pagination />
              </>
            ) : (
              session?.user && <OppApplication user={session.user} />
            )}
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

export const getStaticProps = async ({ params: { id } }) => {
  const query = `*[_type == "opportunity" && _id == '${id}'][0]`
  const usersQuery = '*[_type == "user"]'
  const opportunity = await client.fetch(query)
  const users = await client.fetch(usersQuery)

  return {
    props: { opportunity, users },
  }
}
