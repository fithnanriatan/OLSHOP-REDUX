import { useSelector } from 'react-redux'
import Cart from '../assets/ic-cart.svg'
import { selectCartItemsCount } from '../features/cart/cartSlice'

const Header = ({ handleOpenModalCart }) => {

    const cartTotalItems = useSelector(selectCartItemsCount)

    return (
        <header className="sticky top-0 z-30 bg-blue-700 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <h1 className="text-3xl font-bold text-white">Simple E-Commerce</h1>
                    <button
                        type="button"
                        className="relative rounded-full bg-blue-800 p-2 text-white"
                        onClick={handleOpenModalCart}
                    >
                        {/* Jumlah Item di Cart */}
                        {cartTotalItems > 0 && (
                            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-xs font-bold flex items-center justify-center">
                                {cartTotalItems}
                            </span>
                        )}
                        <img src={Cart} alt="cart" className="w-6 h-6 brightness-0 invert" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header