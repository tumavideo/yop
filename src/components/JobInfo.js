import Meta from './opportunity/Meta'
import ProfileHeader from './opportunity/ProfileHeader'
import Tabs from './opportunity/Tabs'

const tabs = [
  { name: 'Company', href: '#', current: false },
  { name: 'Opportunity', href: '#', current: true },
  { name: 'Application', href: '#', current: false },
]

export default function JobInfo({ job, setState }) {
  return (
    <>
      <article>
        <ProfileHeader handlePress={setState} job={job} />
        <Tabs setState={setState} tabs={tabs} />
        <Meta job={job} />
      </article>
    </>
  )
}
