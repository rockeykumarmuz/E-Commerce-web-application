const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div className='bg-blue-400 py-4 max-w-[100%] text-center text-white mt-4'>
			<p>&copy; copyright {currentYear}. All right reserved.</p>
		</div>
	)
}

export default Footer
