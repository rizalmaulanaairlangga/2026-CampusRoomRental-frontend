import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ToastProvider } from './providers/ToastProvider'
import './index.css'
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./providers/AuthProvider";


const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (err: unknown) => {
        console.error('Global mutation error', err);
      },
    },
  },
});



createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <App />
              <Toaster position="top-right" />
              
            </AuthProvider>

          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </ToastProvider>
  </React.StrictMode>
)
