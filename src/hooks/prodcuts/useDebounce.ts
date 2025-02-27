import { useState, useEffect } from 'react'

// Custom Debounce Hook
const useDebounce = (value: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		// Create a timer when the value changes
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		// Cleanup the timeout when the value changes or the component unmounts
		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debouncedValue
}

export default useDebounce
