import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { AppProvider } from '@/contexts'

import App from '@/App'
import { store } from '@/store'

import 'react-image-lightbox/style.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './index.css'

import '@/i18n'
import reportWebVitals from './reportWebVitals'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(container)

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <AppProvider>
          <RecoilRoot>
            <HelmetProvider>
              <Provider store={store}>
                <QueryClientProvider client={queryClient} contextSharing={true}>
                  <App />
                  <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
              </Provider>
            </HelmetProvider>
          </RecoilRoot>
        </AppProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
