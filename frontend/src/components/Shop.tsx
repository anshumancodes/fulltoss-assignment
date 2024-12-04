import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://api.freeapi.app/api/v1/public/randomproducts',
          params: {
            page: '1',
            limit: '10',
            inc: 'category,price,thumbnail,images,title,id',
            query: 'mens-watches'
          },
          headers: { accept: 'application/json' }
        };

        const { data } = await axios.request(options);
        setProducts(data.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Men's Watches</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">${product.price}</span>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>
              </div>
              {product.images.length > 1 && (
                <div className="mt-2 flex space-x-2">
                  {product.images.slice(0, 3).map((image, index) => (
                    <img 
                      key={index} 
                      src={image} 
                      alt={`${product.title} view ${index + 1}`} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;