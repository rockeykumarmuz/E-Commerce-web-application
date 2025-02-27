import useProductDetails from '@/hooks/prodcuts/useProductDetails'
import { Products } from '@/types/product'
import { useQuery } from '@tanstack/react-query'
import ProductCard from './components/ProductCard'
import { useNavigate } from 'react-router'
import { useFilterContext } from '@/contexts/FilterContext'
import useDebounce from '@/hooks/prodcuts/useDebounce'

const ProductList = () => {
	const { getAllProducts, getProductsSpecificCategory } = useProductDetails()
	const { searchInput, selectedOption } = useFilterContext()

	const navigate = useNavigate()
	const debouncedSearchInput = useDebounce(searchInput, 400)

	const getProductListQuery = useQuery({
		queryKey: ['products'],
		queryFn: getAllProducts,
		staleTime: Infinity, // when route chnages and coming back then don't need to call an api for product list
		enabled: !selectedOption,
	})

	const getProductCategoryQuery = useQuery({
		queryKey: ['products', 'category?type=' + selectedOption],
		queryFn: () => getProductsSpecificCategory('?type=' + selectedOption),
		enabled: selectedOption.length > 1,
	})

	// The onProductClick function that will handle the product navigation
	const handleSingleProductDetail = (productId: number) => {
		navigate(`/products/${productId}`) // Navigate to product detail page using the product ID
	}

	if (getProductListQuery.isLoading) return <div className='flex items-center  justify-center'>Loading...</div>

	// Clean the search input (optional: remove unwanted characters, trim)
	const cleanedSearchInput = debouncedSearchInput.trim().toLowerCase()

	const filteredProducts = getProductListQuery?.data?.products?.filter((product: Products) => {
		// product.title.toLowerCase().includes(searchInput.toLowerCase())

		const productTitle = product?.title?.toLowerCase()

		// Check if all words in the search input are present in the product title
		return cleanedSearchInput.split(' ').every(word => productTitle.includes(word))
	})

	if (getProductCategoryQuery.isLoading) return <div className='flex items-center  justify-center'>Loading...</div>

	return (
		<div className='grid md:grid-cols-4 grid-cols-2 xs:grid-cols-1  max-w-[1170px] mx-auto gap-4 box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25) mt-4'>
			{selectedOption.length < 1 &&
				filteredProducts?.map((product: Products) => {
					return <ProductCard key={product.id} product={product} onProductClick={handleSingleProductDetail} />
				})}

			{getProductCategoryQuery?.data?.products.map((product: Products) => {
				return <ProductCard key={product.id} product={product} onProductClick={handleSingleProductDetail} />
			})}
		</div>
	)
}

export default ProductList
