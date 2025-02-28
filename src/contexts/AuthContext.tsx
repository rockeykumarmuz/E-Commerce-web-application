import { UserInfoType } from '@/types/user'
import { createContext, ReactNode, useContext, useState } from 'react'

export type AuthContextType = {
	isAuthenticated: boolean
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
	userInfo: UserInfoType | null
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type PropType = {
	children: ReactNode
}

export const AuthProvider = ({ children }: PropType) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [userInfo, setUserInfo] = useState<UserInfoType | null>(null)

	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userInfo, setUserInfo }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuthContext must be used within an AuthProvider')
	}
	return context
}
