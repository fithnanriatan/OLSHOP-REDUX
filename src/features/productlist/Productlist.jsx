import { useEffect, useState, useRef } from "react";
import { Star, ShoppingCart, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";
import { formatCategory } from "../../utils/formatCategory";
import FlashNotification from "../../components/FlashNotification";
import Loading from "../../components/Loading";
import ProductControls from "../productControls/ProductControls";

const ProductList = ({ handleOpenModalCart }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [isLoading, setLoading] = useState(false);
    const [flashNotification, setFlashNotification] = useState({
        isVisible: false,
        product: null
    });

    const dispatch = useDispatch();
    const timeoutRef = useRef(null);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleClickBuy = (product) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (flashNotification.isVisible) {
            setFlashNotification({ isVisible: false, product: null });

            setTimeout(() => {
                showNotification(product);
            }, 200);
        } else {
            showNotification(product);
        }

        dispatch(addItemToCart(product));
    };

    const showNotification = (product) => {
        setFlashNotification({ isVisible: true, product });

        timeoutRef.current = setTimeout(() => {
            setFlashNotification({ isVisible: false, product: null });
            timeoutRef.current = null;
        }, 4000);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const renderStarRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star className="w-4 h-4 text-gray-300" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </div>
                    </div>
                );
            } else {
                stars.push(
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                );
            }
        }
        return stars;
    };

    const getCategoryColor = (category) => {
        const colors = {
            'electronics': 'bg-blue-100 text-blue-800',
            'jewelery': 'bg-purple-100 text-purple-800',
            "men's clothing": 'bg-green-100 text-green-800',
            "women's clothing": 'bg-pink-100 text-pink-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-4">

            {/* Filters */}
            <ProductControls
                products={products}
                onChange={setFilteredProducts}
            />

            {/* Products Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing {filteredProducts.length} of {products.length} products
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                        {/* Product Image */}
                        <div className="relative h-64 overflow-hidden bg-gray-50">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Category Badge */}
                            <div className="absolute top-3 left-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                                    {formatCategory(product.category)}
                                </span>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                            {/* Title */}
                            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {product.title}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center">
                                    {renderStarRating(product.rating.rate)}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {product.rating.rate} ({product.rating.count} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                                <span className="text-2xl font-bold text-blue-600">
                                    {formatPrice(product.price)}
                                </span>
                            </div>

                            {/* Buy Button */}
                            <button
                                type="button"
                                onClick={() => handleClickBuy(product)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Products Found */}
            {filteredProducts.length === 0 && !isLoading && (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <Search className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            )}
            {/* Flash Notifications */}
            <FlashNotification
                isVisible={flashNotification.isVisible}
                onClose={() => setFlashNotification({ isVisible: false, product: null })}
                product={flashNotification.product}
                handleOpenModalCart={handleOpenModalCart}
            />

            {/* CSS for animations */}
            <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default ProductList;