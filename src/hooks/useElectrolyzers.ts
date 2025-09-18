import { useMemo } from 'react'
import { electrolyzers } from '../data'
import { useAppStore } from '../store/useAppStore'

export const useElectrolyzers = () => {
  const searchTerm = useAppStore(state => state.searchTerm)
  
  const filteredElectrolyzers = useMemo(() => {
    return electrolyzers.filter(electrolyzer =>
      electrolyzer.id.toString().includes(searchTerm)
    )
  }, [searchTerm])

  return filteredElectrolyzers
}
