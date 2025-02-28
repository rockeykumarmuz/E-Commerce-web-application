import { ProductType } from '@/types/product'

type PropType = {
	product: ProductType
	onProductClick: (productId: number) => void
}

const ProductCard = ({ product, onProductClick }: PropType) => {
	const handleSingleProductDetail = () => {
		if (product) onProductClick(product.id)
	}

	return (
		<div
			className='relative w-[280px] mx-auto p-2 border px-3 hover:cursor-pointer rounded-md mb-2'
			onClick={handleSingleProductDetail}>
			<div className='absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md'>
				{product.price}% Off
			</div>
			<img src={product.image} alt={product.title} className='w-[100%] mt-4' />
			<p className='text-sm pt-4 text-blue-600'>{product.title.slice(0, 60)}</p>
			<p className='text-sm'>{product.category}</p>
			<p className='text-sm'>{product.description.slice(0, 10)}</p>
			<p className='text-md  items-end font-bold'>Rs. {product.price * 100}</p>
		</div>
	)
}

export default ProductCard
