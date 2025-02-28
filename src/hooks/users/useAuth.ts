import axios from '@/api/axios'

const useAuth = () => {
	const addUser = async (payload: unknown) => {
		const response = await axios.post('users', payload)
		return response.data
	}

	const loginUser = async (payload: unknown) => {
		const response = await axios.post('auth/login', payload)
		return response.data
	}

	return {
		addUser,
		loginUser,
	}
}

export default useAuth
