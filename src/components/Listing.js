import { useSession } from 'next-auth/react'
import { useState } from 'react'
import CompanyInfo from './CompanyInfo'
import JobInfo from './JobInfo'
import OppApplication from './OppApplication'

export default function Listing({ opportunity }) {
  const [state, setState] = useState('Opportunity')
  const { data: session } = useSession()

  return (
    <>
      <div className="relative grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-1 lg:px-8 xl:gap-x-12">
        {state === 'Company' && (
          <CompanyInfo company={opportunity.companyRef} setState={setState} />
        )}
        {state === 'Opportunity' && (
          <JobInfo job={opportunity} setState={setState} />
        )}
        {state === 'Application' && (
          <OppApplication
            opportunity={opportunity}
            user={session.user}
            setState={setState}
          />
        )}
      </div>
    </>
  )
}
