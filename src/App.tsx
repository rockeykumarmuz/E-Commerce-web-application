import { Route, Routes } from 'react-router'
import PageLayout from './components/layout/index.tsx'
import ProductList from './pages/ProductList.tsx'
import ProductDetailCard from './pages/components/ProductDetailCard.tsx'
import AddTocartLayout from './pages/addToCart/index.tsx'
import { SignUpForm } from './components/customUI/Register-form.tsx'
import { LoginForm } from './components/customUI/Login-form.tsx'
import AuthLayout from './components/layout/AuthLayout.tsx'

const App = () => {
	return (
		<>
			<Routes>
				{/* Routes for public pages */}
				<Route path='/register' element={<SignUpForm />} />
				<Route path='/login' element={<LoginForm />} />

				{/* Protected routes wrapped in AuthLayout */}
				<Route element={<AuthLayout />}>
					<Route path='/' element={<PageLayout />}>
						<Route path='products' element={<ProductList />} />
						<Route path='/products/:id' element={<ProductDetailCard />} />
						<Route path='/addToCart' element={<AddTocartLayout />} />
					</Route>
				</Route>
			</Routes>
		</>
	)
}

export default App
