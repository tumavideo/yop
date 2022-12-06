import Opportunities from '@/components/Opportunities'
import { client } from '@/lib/client'
import { getCareers } from '@/utils/queries'
import React from 'react'

export default function Finance({ opportunities }) {
  return (
    <Opportunities
      title={'Careers'}
      description={`Provide business support to start-up’s and established MSMEs
      in form of capacity building and training, on-the-job
      coaching, mentorship and hands-on advisory services.`}
      opportunities={opportunities}
      opType={'career'}
    />
  )
}

export const getServerSideProps = async () => {
  const query = getCareers()
  const opportunities = await client.fetch(query)

  return {
    props: { opportunities },
  }
}
