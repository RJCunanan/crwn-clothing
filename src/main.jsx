import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

import App from './App.jsx'
import { UserProvider } from './contexts/user.context.jsx'
import { CategoriesProvider } from './contexts/categories.context.jsx'
import { CartProvider } from './contexts/cart.context.jsx'

import './index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)