import { useDispatch, useSelector } from "react-redux"
import { X, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import Modal from "../../components/Modal"
import { plusQuantityToCart, minusQuantityToCart, selectCartItems, selectCartItemsCount, selectCartTotalPrice, removeItemToCart } from "./cartSlice"

const CartModal = ({handleHideModalCart}) => {
    const totalItems = useSelector(selectCartItemsCount)
    const totalPrice = useSelector(selectCartTotalPrice)
    const cartItems = useSelector(selectCartItems)

    
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleCheckoutToWhatsApp = () => {
        if (totalItems === 0) return;

        const message = encodeURIComponent(
            `Hallo, saya ingin melakukan pembelian dengan rincian:\n\n` +
            cartItems.map(item => `${item.title}: ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.totalPrice)}`).join('\n') + `\n\nTotal: ${formatPrice(totalPrice)}`
        )

        const URL = `https://wa.me/6285920006849?text=${message}`;
        window.open(URL, '_blank');
    }

    const dispatch = useDispatch();

    const handlePlusQuantity = (id) => {
        dispatch(plusQuantityToCart(id));
    }

    const handleMinusQuantity = (id) => {
        dispatch(minusQuantityToCart(id));
    }

    const handleRemoveItem = (id) => {
        dispatch(removeItemToCart(id));
    }

    return (
        <Modal>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <ShoppingBag className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                        <p className="text-sm text-gray-600">{totalItems} items in your cart</p>
                    </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={handleHideModalCart}>
                    <X className="w-6 h-6 text-gray-500" />
                </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-auto max-h-[400px] p-6">
                <div className="space-y-4">
                    {cartItems.map((product) => (
                        <div
                            key={product.id}
                            className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            {/* Product Image */}
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white shadow-sm">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 truncate text-lg">
                                    {product.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-gray-500">Unit price:</span>
                                    <span className="text-blue-600 font-medium">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3 mt-3">
                                    <button 
                                    className="p-1 hover:bg-blue-100 rounded-full transition-colors group"
                                    onClick={() => handleMinusQuantity(product.id)}
                                    >
                                        <Minus className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                                    </button>
                                    <span className="px-3 py-1 bg-white rounded-lg border font-medium min-w-[3rem] text-center">
                                        {product.quantity}
                                    </span>
                                    <button
                                     className="p-1 hover:bg-blue-100 rounded-full transition-colors group"
                                     onClick={() => handlePlusQuantity(product.id)}>
                                        <Plus className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Price & Remove */}
                            <div className="text-right flex flex-col justify-between">
                                <div>
                                    <div className="text-lg font-bold text-gray-800">
                                        {formatPrice(product.totalPrice)}
                                    </div>
                                    {product.quantity > 1 && (
                                        <div className="text-xs text-gray-500">
                                            {product.quantity} × {formatPrice(product.price)}
                                        </div>
                                    )}
                                </div>
                                <button 
                                className="text-red-500 text-sm hover:text-red-700 transition-colors"
                                onClick={() => handleRemoveItem(product.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary */}
            <div className="border-t border-gray-200 bg-gray-50 p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="space-y-1">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal ({totalItems} items)</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center text-xl font-bold text-gray-800 mb-6 pt-4 border-t border-gray-300">
                    <span>Total</span>
                    <span className="text-blue-600">{formatPrice(totalPrice)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                        onClick={handleHideModalCart}
                    >
                        Continue Shopping
                    </button>
                    <button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                        onClick={handleCheckoutToWhatsApp}
                    >
                        <MessageCircle className="w-5 h-5" />
                        Checkout via WhatsApp
                    </button>
                </div>
            </div>
        </Modal>
    );

}

export default CartModal