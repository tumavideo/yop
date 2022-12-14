import { sidebarNav } from '@/utils/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [onboarded, setOnboarded] = useState(false)
  const [opportunities, setOpportunities] = useState(sidebarNav)
  const [selectedOpportunity, setSelectedOpportunity] = useState(
    opportunities[0]
  )

  useEffect(() => {
    setOpportunities(
      JSON.parse(localStorage.getItem('sidebarNav')) || sidebarNav
    )
  }, [])

  return (
    <Context.Provider
      value={{
        onboarded,
        opportunities,
        selectedOpportunity,
        setSelectedOpportunity,
        setOnboarded,
        setOpportunities,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
