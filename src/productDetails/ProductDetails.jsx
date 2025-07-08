import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus
} from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';


const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/products/${id}`);
        if (!res.ok) {
          throw new Error('Product not found');
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log('Product fetch error:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto mt-5 px-4 mb-10">
      {/* Back Button */}
      <div className="mb-4">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="flex justify-center items-center">
          <img src={product.image} alt={product.title} className="rounded-xl object-cover w-full h-[400px] max-w-md" />
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {product.category}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full transition-colors ${
                  isWishlisted
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {renderStars(product.rating || 0)}
              <span className="text-lg font-semibold ml-2">{product.rating || 0}</span>
            </div>
            <span className="text-gray-600">({product.reviews || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-gray-900">${product.price}</div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="pt-4 border-t">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-3 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-600">
                Only {product.stockCount || 'few'} left in stock
              </span>
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">Free Shipping</div>
                <div className="text-sm text-gray-600">On orders over $50</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-medium text-gray-900">2 Year Warranty</div>
                <div className="text-sm text-gray-600">Full coverage</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <RotateCcw className="w-6 h-6 text-purple-600" />
              <div>
                <div className="font-medium text-gray-900">30-Day Returns</div>
                <div className="text-sm text-gray-600">Money-back guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;