import axios from '@/api/axios'

const GET_SPECIFIC_CATEGORY_PRODUCTS = 'products/category/'
const GET_ALL_CATEGORY = 'products/categories'

const useProductDetails = () => {
	const getAllProducts = async () => {
		const response = await axios.get('products')
		return response.data
	}

	const getSingleProduct = async (id: string) => {
		const response = await axios.get(`products/${id}`)
		return response.data
	}

	const getProductsSpecificCategory = async (category: string) => {
		const payload = category.replace(/\s/g, '-')
		const response = await axios.get(GET_SPECIFIC_CATEGORY_PRODUCTS + payload)
		return response.data
	}

	const getAllCategory = async () => {
		const response = await axios.get(GET_ALL_CATEGORY)
		return response.data
	}

	return {
		getAllProducts,
		getSingleProduct,
		getProductsSpecificCategory,
		getAllCategory,
	}
}

export default useProductDetails
