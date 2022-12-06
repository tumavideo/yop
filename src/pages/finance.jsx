import Opportunities from '@/components/Opportunities'
import { client } from '@/lib/client'
import { getFunding } from '@/utils/queries'
import React from 'react'

export default function Finance({ opportunities }) {
  return (
    <Opportunities
      title={'Finance'}
      description={
        'Access to funding for start-ups, business growth, skills and career training bursaries.'
      }
      opportunities={opportunities}
      opType={'finance'}
    />
  )
}

export const getServerSideProps = async () => {
  const query = getFunding()
  const opportunities = await client.fetch(query)

  return {
    props: { opportunities },
  }
}
