import Opportunities from '@/components/Opportunities'
import { client } from '@/lib/client'
import { getEducation } from '@/utils/queries'
import React from 'react'

export default function Finance({ opportunities }) {
  return (
    <Opportunities
      title={'Skills'}
      description={
        'Access to funding for start-ups, business growth, skills and career training bursaries.'
      }
      opportunities={opportunities}
      opType={'skill'}
    />
  )
}

export const getServerSideProps = async () => {
  const query = getEducation()
  const opportunities = await client.fetch(query)

  return {
    props: { opportunities },
  }
}
