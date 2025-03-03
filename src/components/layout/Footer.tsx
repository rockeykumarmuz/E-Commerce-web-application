const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div className='bg-indigo-700 py-4 text-center text-white mt-4 w-[100%]'>
			<p>&copy; copyright {currentYear}. All right reserved.</p>
		</div>
	)
}

export default Footer
