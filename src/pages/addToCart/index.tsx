import { useCartContext } from '@/contexts/CartContext'

import AddTocartList from './AddTocartList'

const AddTocartLayout = () => {
	const { cartItems } = useCartContext()

	return (
		<div className='max-w-[1170px] mx-auto'>
			<AddTocartList cartItems={cartItems} />
		</div>
	)
}

export default AddTocartLayout
