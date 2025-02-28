import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import useAuth from '@/hooks/users/useAuth'

const signUpSchema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters long'),
	email: z.string().email('Invalid email Id'),
	password: z.string().min(6, 'Password must be at least 5 characters long'),
})

export type SignUpFormValues = z.infer<typeof signUpSchema>

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const { addUser } = useAuth()

	const methods = useForm<SignUpFormValues>({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(signUpSchema),
	})

	const handleFormSubmit = async (data: SignUpFormValues) => {
		const payload = { id: Date.now(), ...data }
		const response = await addUser(payload)
		methods.reset()
		return response.data
	}

	return (
		<div
			className={cn('flex bg-indigo-700 flex-col gap-6  mx-auto h-[100vh] justify-center items-center', className)}
			{...props}>
			<div className='sm:w-[500px] w-[300px] mx-auto'>
				<Card className='w-[100%] m-3'>
					<CardHeader className='text-center'>
						<CardTitle className='text-xl'>Welcome back</CardTitle>
						<CardDescription>Login with your Apple or Google account</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
							<div className='grid gap-6'>
								<div className='grid gap-6'>
									<div className='grid gap-2'>
										<Label htmlFor='username'>Username</Label>
										<Input
											id='username'
											type='text'
											placeholder='m@example.com'
											{...methods.register('username')}
											required
										/>
										{methods.formState.errors.username && <p>{methods.formState.errors.username.message}</p>}
									</div>

									<div className='grid gap-2'>
										<Label htmlFor='email'>Email</Label>
										<Input
											id='email'
											type='email'
											placeholder='m@example.com'
											{...methods.register('email')}
											required
										/>
										{methods.formState.errors.email && <p>{methods.formState.errors.email.message}</p>}
									</div>

									<div className='grid gap-2'>
										<div className='flex items-center'>
											<Label htmlFor='password'>Password</Label>
										</div>
										<Input id='password' type='password' {...methods.register('password')} required />
										{methods.formState.errors.password && <p>{methods.formState.errors.password.message}</p>}
									</div>

									<Button type='submit' className='w-full'>
										Sign up
									</Button>
								</div>
								<div className='text-center text-sm'>
									{/* Don&apos;t have an account?{' '} */}
									Already have an account?{' '}
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
