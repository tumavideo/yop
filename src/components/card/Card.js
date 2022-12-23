import { useStateContext } from '@/context/StateContext'
import { classNames } from '@/lib/utils'

export default function Cards() {
  const { opportunities, setOpportunities } = useStateContext()

  const handleSelect = (init) => {
    setOpportunities(
      opportunities.map((opp) => {
        return opp.initials === init ? { ...opp, selected: !opp.selected } : opp
      })
    )
    localStorage.setItem('sidebarNav', JSON.stringify(opportunities))
  }

  return (
    <div>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 p-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      >
        {opportunities.map((opportunity) => (
          <li
            key={opportunity.name}
            className="col-span-1 flex rounded-md shadow-sm"
          >
            <div
              className={classNames(
                opportunity.selected ? opportunity.iconColor : 'bg-gray-300',
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
              )}
            >
              {opportunity.initials}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a
                  onClick={() => handleSelect(opportunity.initials)}
                  href={'#'}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {opportunity.name}
                </a>
                <p className="text-gray-500">{opportunity.members}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
