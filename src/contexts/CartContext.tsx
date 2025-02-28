import { ProductType } from '@/types/product'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

export type CartContextType = {
	cartItems: ProductType[]
	addToCart: (product: ProductType) => void
	removeFromCart: (productId: number) => void
	setCartItems: Dispatch<SetStateAction<ProductType[]>>
	quantities: { [key: string]: number }
	setQuantities: Dispatch<SetStateAction<{ [key: string]: number }>>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartProviderProps = {
	children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
	const [cartItems, setCartItems] = useState<ProductType[]>([])
	const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

	const addToCart = (product: ProductType) => {
		if (cartItems.length > 0) {
			cartItems.find((item: ProductType) => item.id !== product.id) ? setCartItems(prev => [...prev, product]) : null
			return <p className='bg-green-500 text-white border-[1px] p-3'>Items are already added to cart</p>
		}
		setCartItems(prev => [...prev, product])
	}

	const removeFromCart = (productId: number) => {
		setCartItems(prev => prev.filter(item => item.id !== productId))
	}

	return (
		<CartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCartItems, quantities, setQuantities }}>
			{children}
		</CartContext.Provider>
	)
}

export const useCartContext = () => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCart must be used within a CartProvider')
	}

	return context
}
