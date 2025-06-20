import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleClickBuy = (product) => {
        dispatch(addItemToCart(product))
    }

    return (
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
            {products.map((product) => {
                return (
                    <div
                        key={product.id}
                        className="group bg-white w-full rounded-xl shadow-md p-4"
                    >
                        <div className="relative w-[80%] h-[320px] mx-auto overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-scale duration-500 ease-in-out"
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-8">
                            <h3 className="font-bold">{product.title}</h3>
                            <h6>${product.price}</h6>
                            <button
                                type="button"
                                className="bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-3 px-8"
                                onClick={() => handleClickBuy(product)}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;
