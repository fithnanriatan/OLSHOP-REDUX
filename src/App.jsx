import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ProductList from './features/productlist/ProductList'
import CartModal from './features/cart/CartModal'

function App() {

  const [isOpenModalCart, setIsOpenModalCart] = useState(false)

  const handleOpenModalCart = () => {
    setIsOpenModalCart(true)
  }

  const handleHideModalCart = () => {
    setIsOpenModalCart(false)
  }
  
  return (
  <div className="min-h-screen flex flex-col bg-gray-50">
    {isOpenModalCart && (
      <CartModal handleHideModalCart={handleHideModalCart} />
    )}

    <Header handleOpenModalCart={handleOpenModalCart} />

    <main className="flex-1 max-w-7xl mx-auto px-4 py-6">
      
      <ProductList handleOpenModalCart={handleOpenModalCart} />
    </main>
  </div>
);

}

export default App
