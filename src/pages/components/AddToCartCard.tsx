import { useCartContext } from '@/contexts/CartContext'
import { ProductType } from '@/types/product'
import { Trash2 } from 'lucide-react'

type PropType = {
	item: ProductType
}

const AddToCartCard = ({ item }: PropType) => {
	const { setCartItems, quantities, setQuantities } = useCartContext()

	// access the current quantity of an item
	let count = quantities[item.id] || 1
	const totalPrice = count * item.price

	// remove item from the cart
	const removeCartHandler = () => {
		setCartItems(products => products.filter(product => product.id !== item.id))
		setQuantities(prev => {
			const newQuantity = { ...prev }
			delete newQuantity[item.id] // removing the quantity or item from cart while deleting
			return newQuantity
		})
	}

	// decrement quanity of a cart item
	const decrementQuantity = () => {
		if (count > 1) {
			setQuantities(prev => ({
				...prev,
				[item.id]: count - 1,
			}))
		}
	}

	// increment quantity of a cart item
	const incrementQuantity = () => {
		setQuantities(prev => ({
			...prev,
			[item.id]: (prev[item.id] || 1) + 1,
		}))
	}

	return (
		<div>
			<hr className='pb-4' />
			<div className='grid sm:grid-cols-5 grid-cols-1 gap-8 items-center'>
				<div className='grid grid-cols-2 items-center'>
					<div className='w-[70px]'>
						<img src={item.image} alt='xs' className='w-[100%] h-[70px] object-cover mb-2' />
					</div>
					<p className='' title={item.title}>
						{item.title.slice(0, 20) + '...'}
					</p>
				</div>
				<p> ${item.price}</p>

				{/* codes for the items to increase or decrease the quantity */}
				<div className='items-center'>
					<div className='flex items-center space-x-2'>
						<button
							className='w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
							onClick={decrementQuantity}
							disabled={count === 1}>
							<span className='text-xl'>-</span>
						</button>

						<input
							type='text'
							value={count}
							readOnly
							className='w-16 h-8 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
						/>

						<button
							className='w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
							onClick={incrementQuantity}>
							<span className='text-xl'>+</span>
						</button>
					</div>
				</div>
				<p>₹{totalPrice * 87}</p>

				<button onClick={removeCartHandler}>
					<Trash2 className='hover:text-red-600' />
				</button>
			</div>
		</div>
	)
}

export default AddToCartCard
