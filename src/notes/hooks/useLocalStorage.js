import React, { useState } from "react"

export const useLocalStorage = (key, initialValue) => {
	const initValue = () => {
		if (typeof window === "undefined"){
			return initialValue
		}
		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		}
		catch (error) {
			return initialValue
		}
	}
	const [storageValue, setStorageValue] = useState(initValue)

	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(storageValue) : value
			setStorageValue(valueToStore)
			if (typeof window !== "undefined"){
				window.localStorage.setItem(key, JSON.stringify(valueToStore))
			}
		}	
		catch (error) {

		}
	}

	return [storageValue, setValue] 
}