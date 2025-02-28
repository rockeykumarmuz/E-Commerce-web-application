import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterProvider } from './contexts/FilterContext.tsx'
import { CartProvider } from './contexts/CartContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AuthProvider>
					<FilterProvider>
						<CartProvider>
							<App />
						</CartProvider>
					</FilterProvider>
				</AuthProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
)
