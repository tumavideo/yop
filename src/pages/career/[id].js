import { useState } from 'react'
import { useSession } from 'next-auth/react'

import OppApplication from '@/components/OppApplication'
import JobInfo from '@/components/JobInfo'
import CompanyInfo from '@/components/CompanyInfo'
import { client } from '@/lib/client'

export default function Listing({ career }) {
  const [state, setState] = useState('Opportunity')
  const { data: session } = useSession()

  return (
    <>
      <div className="relative grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-1 lg:px-8 xl:gap-x-12">
        {state === 'Opportunity' && (
          <JobInfo job={career} setState={setState} />
        )}
        {state === 'Application' && (
          <OppApplication
            opportunity={career}
            user={session.user}
            setState={setState}
          />
        )}
        {state === 'Company' && (
          <CompanyInfo company={career.companyRef} setState={setState} />
        )}
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "career"] {
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
  const query = `*[_type == "career" && _id == '${id}'][0]{
    _id,
    _createdAt,
    _type,
    brief,
    description,
    title,
    link,
    companyRef->{bio,company,feature,logo}
  }`
  const career = await client.fetch(query)

  return {
    props: { career },
  }
}
