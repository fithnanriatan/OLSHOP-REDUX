import { CheckCircle, X } from 'lucide-react';

// Flash Notification Component
const FlashNotification = ({ isVisible, onClose, product, handleOpenModalCart }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-white rounded-lg shadow-2xl border border-green-200 p-4 max-w-sm">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800 text-sm">Added to Cart!</h4>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <img
                                src={product?.image}
                                alt={product?.title}
                                className="w-10 h-10 object-cover rounded"
                            />
                            <div>
                                <p className="text-sm text-gray-600 line-clamp-1">{product?.title}</p>
                                <p className="text-sm font-medium text-green-600">${product?.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition-colors"
                        onClick={handleOpenModalCart}
                    >
                        View Cart
                    </button>
                </div>
            </div>
        </div >
    );
};

export default FlashNotification;