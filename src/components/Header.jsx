import Cart from '../assets/ic-cart.svg'

const Header = () => {
    return (
        <header className="bg-blue-700">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <h1 className="text-3xl font-bold text-gray-100">Simple E-Commerce</h1>
                    <button
                        type="button"
                        className="relative rounded-full bg-blue-800 p-2 text-gray-100"
                    >
                        <img src={Cart} alt="cart" className='w-6 h-6 brightness-0 invert'/>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header