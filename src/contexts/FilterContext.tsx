// src/context/FilterContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react'

export type FilterContextType = {
	searchInput: string
	setSearchInput: (input: string) => void
	selectedOption: string
	setSelectedOption: (input: string) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

type FilterProviderProps = {
	children: ReactNode
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
	const [searchInput, setSearchInput] = useState('')
	const [selectedOption, setSelectedOption] = useState('')

	return (
		<FilterContext.Provider value={{ searchInput, setSearchInput, selectedOption, setSelectedOption }}>
			{children}
		</FilterContext.Provider>
	)
}

export const useFilterContext = () => {
	const context = useContext(FilterContext)
	if (!context) {
		throw new Error('useFilterContext must be used within a FilterProvider')
	}
	return context
}
