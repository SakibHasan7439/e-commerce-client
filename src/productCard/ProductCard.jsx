import { Heart } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl max-w-[220px] shadow-md hover:shadow-lg transition overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{product.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 cursor-pointer text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <Link
          to={`/productDetails/${product._id}`}
          className="block mt-3 text-blue-600 hover:underline text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
