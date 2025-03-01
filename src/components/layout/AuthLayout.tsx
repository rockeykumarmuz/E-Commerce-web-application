import axios from '@/api/axios'
import { useAuthContext } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Navigate } from 'react-router-dom' // Use useLocation to prevent unnecessary redirects

const AuthLayout = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
	const location = useLocation() // To preserve the original location after login
	const { userInfo, setUserInfo } = useAuthContext()

	useEffect(() => {
		const savedUserInfo = localStorage.getItem('userInfo')!

		if (savedUserInfo) {
			const { accessToken, id, email, username, firstName, lastName, gender, image, refreshToken } =
				JSON.parse(savedUserInfo)
			setUserInfo({ accessToken, id, email, username, firstName, lastName, gender, image, refreshToken })
			setIsAuthenticated(true)
			axios.defaults.headers.common['Authorization'] = savedUserInfo
		} else {
			setIsAuthenticated(false)
		}
	}, [])

	// Loading state
	if (isAuthenticated === null) return <div>Loading...</div>

	// Redirect if not authenticated
	if (!isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} replace={true} />
	}

	return isAuthenticated || userInfo?.accessToken ? <Outlet /> : null
}

export default AuthLayout
