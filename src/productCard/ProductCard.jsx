import { Heart, Star } from "lucide-react";
import { Link } from "react-router";

const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-800">
          {product.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-400 ml-2">({product.reviews} reviews)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add to Cart
          </button>
        </div>
        <Link to={`/productDetails/${product?._id}`}>
            <button
                className="w-full mt-4 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                View Details
            </button>
        </Link>
      </div>
    </div>
  );

  export default ProductCard;