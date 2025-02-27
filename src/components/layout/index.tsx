import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

const PageLayOut = () => {
	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	)
}

export default PageLayOut
