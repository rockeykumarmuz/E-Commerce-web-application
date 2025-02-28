import { Route, Routes } from 'react-router'
import PageLayOut from './components/layout/index.tsx'
import ProductList from './pages/ProductList.tsx'
import ProductDetailCard from './pages/components/ProductDetailCard.tsx'
import AddTocartLayout from './pages/addToCart/index.tsx'
import { SignUpForm } from './components/customUI/Register-form.tsx'
import { LoginForm } from './components/customUI/Login-form.tsx'

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/register' element={<SignUpForm />} />
				<Route path='/login' element={<LoginForm />} />

				<Route path='/' element={<PageLayOut />}>
					<Route path='products' element={<ProductList />} />
					<Route path='/products/:id' element={<ProductDetailCard />} />
					<Route path='/addToCart' element={<AddTocartLayout />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
