import { ProductType } from '@/types/product'
import AddToCartCard from '../components/AddToCartCard'
import { useCartContext } from '@/contexts/CartContext'

type Props = {
	cartItems: ProductType[]
}

const AddTocartList = ({ cartItems }: Props) => {
	const { quantities } = useCartContext()

	const totalProductPrice = cartItems.reduce((ele, product) => ele + product.price * (quantities[product.id] || 1), 0)

	return (
		<div className='max-w-[1170px] mx-auto'>
			<div className='grid sm:grid-cols-5 grid-cols-1 items-center gap-8 py-2 font-semibold mt-3'>
				<h3>Item</h3>
				<h3>Price</h3>
				<h3>Quantity</h3>
				<h3>Total</h3>
			</div>
			{!cartItems ? (
				<p>No Item availale in the Cart.</p>
			) : (
				cartItems?.map((item: ProductType) => {
					return <AddToCartCard key={item.id} item={item} />
				})
			)}
			{/* code for total price of the cart itmes */}
			{totalProductPrice > 0 ?(
				<>
					<hr className='pb-4' />
					<div className='flex justify-end'>
						<p className='text-md font-bold'>Total Price: ₹{totalProductPrice * 87}</p>
					</div>
				</>
			) : <p className='text-center font-bold p-2'>No Products are added to cart.</p>}
		</div>
	)
}

export default AddTocartList
