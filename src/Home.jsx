import React, { useEffect, useState } from 'react';
import ProductCard from './productCard/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchProducts = async() =>{
      try {
        const res = await fetch("http://localhost:3000/products")
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("error found", error.message);
      }
    }

    fetchProducts();
  }, []);

  console.log(products);
  return (
    <div>
       <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Shop the latest trends with unbeatable prices
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;