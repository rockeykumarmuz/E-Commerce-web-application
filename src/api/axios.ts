import axios from 'axios'

const API_BASE_URL = 'https://fakestoreapi.com/'

export default axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})
