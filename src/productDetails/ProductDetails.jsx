import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw, 
  Award,
  Check,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [product, setProduct] = useState({}); 

    const {id} = useParams();
    console.log(id);

      const handleQuantityChange = (change) => {
        setQuantity(Math.max(1, quantity + change));
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

    useEffect(()=>{
        const fetchProduct = async() =>{
            try {
                const res = await fetch(`http://localhost:3000/products/${id}`);
                console.log(res);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.log("single page product fetch error: ", error.message);
            }
        };

        fetchProduct();
    }, [id])
    
    return (
        <div className='max-w-6xl mx-auto mt-5 px-2 lg:px-0 mb-4'>
            <div className='flex justify-center mb-8'>
                <img src={product?.image} alt="mans cloth image" />
            </div>
            <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
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

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="text-lg font-semibold ml-2">{product.rating}</span>
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="py-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  25% OFF
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">In Stock</span>
                <span className="text-gray-600">({product.stockCount} available)</span>
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            {
                product?.features && <div>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            }

            {/* Quantity and Add to Cart */}
            <div className="border-t pt-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  Only {product.stockCount} left in stock
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-6 h-6" />
                  <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
                </button>
                
                <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Free Shipping</div>
                  <div className="text-sm text-gray-600">On orders over $50</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">2 Year Warranty</div>
                  <div className="text-sm text-gray-600">Full coverage</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <RotateCcw className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-gray-900">30-Day Returns</div>
                  <div className="text-sm text-gray-600">Money back guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>


    );
};

export default ProductDetails;