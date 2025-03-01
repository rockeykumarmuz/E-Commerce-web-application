import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import useAuth from '@/hooks/users/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { json } from 'stream/consumers'

const signUpSchema = z.object({
	username: z.string().min(3, 'Please enter valid username'),
	password: z.string().min(6, 'Password is incorrect'),
})

export type SignUpFormValues = z.infer<typeof signUpSchema>

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const { loginUser } = useAuth()
	const navigate = useNavigate()
	const methods = useForm<SignUpFormValues>({
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: zodResolver(signUpSchema),
	})

	const handleFormSubmit = async (data: SignUpFormValues) => {
		const payload = {
			username: data.username,
			password: data.password,
		}
		try {
			const response = await loginUser(payload)
			localStorage.setItem('userInfo', JSON.stringify(response))
			methods.reset()
			localStorage.setItem('userImage', response.image)
			navigate('/products')
		} catch (error) {
			console.log('Invalid Credentials')
		}
	}

	return (
		<div
			className={cn('flex bg-indigo-700 flex-col gap-6  mx-auto h-[100vh] justify-center items-center', className)}
			{...props}>
			<div className='sm:w-[400px] w-[300px] mx-auto'>
				<Card className='w-[100%] m-3'>
					<CardHeader className='text-center'>
						<CardTitle className='text-xl'>Welcome back</CardTitle>
						{/* <CardDescription>Login with your Apple or Google account</CardDescription> */}
					</CardHeader>
					<CardContent>
						<form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
							<div className='grid gap-6'>
								<div className='grid gap-6'>
									<div className='grid gap-2'>
										<Label htmlFor='email'>Email</Label>
										<Input
											id='username'
											type='username'
											placeholder='m@example.com'
											{...methods.register('username')}
											required
										/>
										{methods.formState.errors.username && <p>{methods.formState.errors.username.message}</p>}
									</div>

									<div className='grid gap-2'>
										<div className='flex items-center'>
											<Label htmlFor='password'>Password</Label>
										</div>
										<Input id='password' type='password' {...methods.register('password')} required />
										{methods.formState.errors.password && <p>{methods.formState.errors.password.message}</p>}
									</div>

									<Button type='submit' className='w-full'>
										Login
									</Button>
								</div>
								<div className='text-center text-sm'>
									Don&apos;t have an account?{' '}
									<a href='#' className='underline underline-offset-4'>
										Login
									</a>
								</div>
							</div>
						</form>
					</CardContent>
				</Card>
				<div className='text-balance text-white text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary m-3 '>
					By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
				</div>
			</div>
		</div>
	)
}
