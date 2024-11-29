import { createRoot } from 'react-dom/client'
import './index.css'
import { I18nextProvider } from 'react-i18next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { App } from './App'
import i18n from './i18n.js'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />{/* TODO: delete in production*/}
    </I18nextProvider>
  </QueryClientProvider>
)
