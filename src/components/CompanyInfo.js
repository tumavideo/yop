import Meta from './opportunity/Meta'
import ProfileHeader from './opportunity/ProfileHeader'
import Tabs from './opportunity/Tabs'

const tabs = [
  { name: 'Company', href: '#', current: true },
  { name: 'Opportunity', href: '#', current: false },
  { name: 'Application', href: '#', current: false },
]

export default function CompanyInfo({ company, setState }) {
  return (
    <>
      <article>
        <ProfileHeader company={company} handlePress={setState} />
        <Tabs setState={setState} tabs={tabs} />
        <Meta company={company} />
      </article>
    </>
  )
}
