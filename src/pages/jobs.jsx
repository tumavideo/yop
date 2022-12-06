import Opportunities from '@/components/Opportunities'
import { client } from '@/lib/client'
import { findJobs } from '@/utils/queries'
import React from 'react'

export default function Finance({ opportunities }) {
  return (
    <Opportunities
      title={'Jobs'}
      description={`Find jobs and employees. Match interests, work values and
        skills with the world of work, as well as, hire people that
        fit your criteria.`}
      opportunities={opportunities}
      opType={'job'}
    />
  )
}

export const getServerSideProps = async () => {
  const query = findJobs()
  const opportunities = await client.fetch(query)

  return {
    props: { opportunities },
  }
}
