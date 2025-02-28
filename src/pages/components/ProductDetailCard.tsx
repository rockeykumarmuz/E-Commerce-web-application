import { useCartContext } from '@/contexts/CartContext'
import useProductDetails from '@/hooks/prodcuts/useProductDetails'
import { ProductType } from '@/types/product'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'

function getSpecialDiscountedPrice(price: number, discountPercentage: number) {
	return (price - (price * discountPercentage) / 100) * 100
}

const ProductDetailCard = () => {
	const { getSingleProduct } = useProductDetails()
	const params = useParams()
	const navigate = useNavigate()
	const { addToCart } = useCartContext()

	if (!params.id) return

	const getSingleProductDetailsQeury = useQuery({
		queryKey: ['singleProductDetails', params.id],
		queryFn: () => getSingleProduct(params.id as string),
		staleTime: Infinity,
	})

	const handleCartPageRedirect = (product: ProductType) => {
		addToCart(product)
		navigate('/addToCart')
	}

	if (getSingleProductDetailsQeury.isLoading) return <div className='flex items-center  justify-center'>Loading...</div>

	const product = getSingleProductDetailsQeury?.data as ProductType

	return (
		<div className='max-w-[1170px] grid sm:grid-cols-[40%_auto] grid-cols-1 sm:mx-auto mx-[1rem] mt-4 gap-8'>
			<div className=' mx-auto'>
				<img src={product.image} alt={product.title} className='border-[1px] rounded-md  m-3' />
				<div className='flex items-center justify-between m-3' onClick={() => handleCartPageRedirect(product)}>
					<button className='border-[1px] py-3 rounded-md px-6 ml-3'>
						<svg width='33' height='27' viewBox='0 0 33 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M20.4999 19.3332H7.63479C7.43963 19.3332 7.25067 19.2647 7.10083 19.1396C6.951 19.0146 6.84981 18.8409 6.8149 18.6489L4.03342 3.35077C3.99851 3.15876 3.89732 2.98509 3.74749 2.86004C3.59765 2.735 3.40869 2.6665 3.21353 2.6665H1.33325'
								stroke='#212121'
								stroke-width='1.86667'
								stroke-linecap='round'
								stroke-linejoin='round'></path>
							<path
								d='M8.00008 23.4997C9.15067 23.4997 10.0834 22.5669 10.0834 21.4163C10.0834 20.2657 9.15067 19.333 8.00008 19.333C6.84949 19.333 5.91675 20.2657 5.91675 21.4163C5.91675 22.5669 6.84949 23.4997 8.00008 23.4997Z'
								stroke='#212121'
								stroke-width='1.86667'
								stroke-linecap='round'
								stroke-linejoin='round'></path>
							<path
								d='M20.5001 23.4997C21.6507 23.4997 22.5834 22.5669 22.5834 21.4163C22.5834 20.2657 21.6507 19.333 20.5001 19.333C19.3495 19.333 18.4167 20.2657 18.4167 21.4163C18.4167 22.5669 19.3495 23.4997 20.5001 23.4997Z'
								stroke='#212121'
								stroke-width='1.86667'
								stroke-linecap='round'
								stroke-linejoin='round'></path>
							<path
								d='M4.66675 6.83301H22.8349C22.957 6.83301 23.0775 6.85982 23.1881 6.91155C23.2986 6.96328 23.3965 7.03867 23.4747 7.13238C23.5529 7.22609 23.6096 7.33584 23.6407 7.45387C23.6718 7.5719 23.6766 7.69532 23.6548 7.81541L22.2912 15.3154C22.2563 15.5074 22.1551 15.6811 22.0052 15.8061C21.8554 15.9312 21.6664 15.9997 21.4713 15.9997H6.33341'
								stroke='#212121'
								stroke-width='1.86667'
								stroke-linecap='round'
								stroke-linejoin='round'></path>
							<rect x='19.1667' y='0.166504' width='13.4916' height='13.4916' rx='6.74579' fill='white'></rect>
							<path
								d='M25.9126 2.19824V11.6263M21.1986 6.91229H30.6266'
								stroke='#212121'
								stroke-width='1.6'
								stroke-linejoin='round'></path>
						</svg>
					</button>
					<button className='bg-[#fb641b] text-white px-8 rounded-md py-3 font-medium text-xl'>BUY NOW</button>
				</div>
			</div>
			<div className='mt-3 p-4'>
				<p className='text-center text-green-700 py-2 font-bold'>{product.title}</p>
				<h3 className='leading-[1.4]'>{product.description}</h3>
				<div className='grid sm:grid-cols-4 grid-cols-2 sm:gap-3 gap:4'>
					<div className='mt-2'>
						<p className='text-gray-500'>Brand</p>
						<p className='font-medium'>{product.category}</p>
					</div>
					<div className='mt-2'>
						<p className='text-gray-500'>Model</p>
						<p className='font-medium'>{product.category}</p>
					</div>
					<div className='mt-2'>
						<p className='text-gray-500'>Color</p>
						<p className='font-medium'>{product.category}</p>
					</div>
					<div className='mt-2'>
						<p className='text-gray-500'>Category</p>
						<p className='font-medium'>{product.category}</p>
					</div>
				</div>

				<div className='font-semibold text-[#388e3c] mt-[12px] text-sm'>Special Price</div>
				<div className='flex flex-row gap-3'>
					<div className='font-bold'>₹{getSpecialDiscountedPrice(product.price, product.id)}</div>
					<div className='text-gray-500 pt-[6px] text-sm'>
						<s>₹{product.price * 100}</s>
					</div>
					<div className='text-[#388e3c] pt-[6px] text-sm font-bold'>
						{product.category}
						<span className='text-[#388e3c]'>% off</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetailCard
