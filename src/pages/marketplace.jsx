import Opportunities from '@/components/Opportunities'
import { client } from '@/lib/client'
import { findMarketplace } from '@/utils/queries'
import React from 'react'

export default function Finance({ opportunities }) {
  return (
    <Opportunities
      title={'Market'}
      description={'Linking sellers to buyers.'}
      opportunities={opportunities}
      opType={'market'}
    />
  )
}

export const getServerSideProps = async () => {
  const query = findMarketplace()
  const opportunities = await client.fetch(query)

  return {
    props: { opportunities },
  }
}
