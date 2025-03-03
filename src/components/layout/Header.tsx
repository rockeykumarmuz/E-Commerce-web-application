import { Link, useNavigate } from 'react-router'
import { ShoppingCart } from 'lucide-react'
import useProductDetails from '@/hooks/prodcuts/useProductDetails'
import { useQuery } from '@tanstack/react-query'
import { useFilterContext } from '@/contexts/FilterContext'
import { CategoryType } from '@/types/product'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useAuthContext } from '@/contexts/AuthContext'
import { DropdownMenu } from '../ui/dropdown-menu'
import { useState } from 'react'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

const Header = () => {
	const { searchInput, setSearchInput, selectedOption, setSelectedOption } = useFilterContext()
	const navigate = useNavigate()
	const { userInfo } = useAuthContext()
	const [isOpen, setIsOpen] = useState(false)

	const { getAllCategory } = useProductDetails()

	const getProductListQuery = useQuery({
		queryKey: ['products', 'category'],
		queryFn: getAllCategory,
		staleTime: Infinity,
	})

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const handleLogOut = () => {
		localStorage.removeItem('userInfo')
		navigate('/login')
	}

	const handleLogin = () => {
		navigate('/login')
	}

	return (
		<header className='bg-indigo-700 sticky top-0 z-10'>
			<nav className='max-w-[1170px] mx-auto flex justify-between items-center py-[1rem]'>
				<div className='w-[100%] flex items-center justify-start ml-6'>
					<h2
						className='text-white text-2xl foont-extrabold hover:cursor-pointer'
						onClick={() => navigate('/products')}>
						Shopping Verse
					</h2>

					<div className='sm:w-[500px] w-[200px] md:w-[500px] sm:ml-8 ml-2 relative'>
						<select
							className='absolute py-2 border-none outline-none field-sizing-content'
							value={selectedOption}
							onChange={e => setSelectedOption(e.target.value)}>
							<option value='' key='default'>
								Category
							</option>
							{getProductListQuery.isSuccess &&
								getProductListQuery?.data?.map?.((category: CategoryType) => {
									return (
										<>
											<option value={category.name} key={category.slug}>
												{category.name}
											</option>
										</>
									)
								})}
						</select>
						<input
							className='bg-white w-[100%] border-spacing-1 pl-[100px] border-l-2 py-2 outline-none border-none rounded-md'
							placeholder='Search for Products, Brands and More'
							value={searchInput}
							onChange={e => setSearchInput(e.target.value)}
						/>
					</div>
				</div>

				<ul className='flex justify-between items-center'>
					<li className='mr-[1.5rem]'>
						<Link to='/addToCart' className='flex justify-center items-center text-white gap-2'>
							<ShoppingCart />
							Cart
						</Link>
					</li>
				</ul>

				{userInfo && (
					<ul>
						<li>
							<DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!open)}>
								<DropdownMenuTrigger asChild>
									<li>
										<Avatar className='hover: cursor-pointer' onClick={toggleDropdown}>
											<AvatarImage src='' className='bg-red-400' />
											<AvatarFallback className='font-bold'>
												{userInfo?.firstName?.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</li>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='bg-gray-50 w-[80px] h-auto p-2 rounded-md shadow-gray-50 m-2'>
									{userInfo ? (
										<DropdownMenuItem
											className='border-none outline-none hover:cursor-pointer py-1'
											onClick={handleLogOut}>
											Logout
										</DropdownMenuItem>
									) : (
										<DropdownMenuItem className='border-none outline-none hover:cursor-pointer' onClick={handleLogin}>
											Login
										</DropdownMenuItem>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						</li>
					</ul>
				)}
			</nav>
		</header>
	)
}

export default Header
