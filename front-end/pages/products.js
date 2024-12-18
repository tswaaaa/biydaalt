import { useState, useEffect } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const [product_name, setProduct_name] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [price, setPrice] = useState(""); 
  const [stock, setStock] = useState(""); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // Post request to create a new product
  const handleCreateProduct = async () => {
    try {
      await axios.post("http://localhost:4000/createProduct", {
        product_name, 
        description,   
        price,
        stock,
      });

      setProduct_name("");  
      setDescription("");    
      setPrice("");        
      setStock("");          
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };

  return (
    <div>
        <header className="flex justify-between items-center bg-pink-500 p-4">
        <li><a href="/" className="font-extrabold text-3xl text-pink-100">Ecommerse</a></li>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/users" className="text-pink-100 font-semibold">Users</a></li>
            <li><a href="/products" className="text-pink-100 font-semibold">Products</a></li>
            <li><a href="/orders" className="text-pink-100 font-semibold">Orders</a></li>
            <li><a href="/order-items" className="text-pink-100 font-semibold">Order Items</a></li>
            <li><a href="/reviews" className="text-pink-100 font-semibold">Reviews</a></li>
          </ul>
        </nav>
      </header>
      <div className="mb-8 p-6 bg-pink-50 rounded-lg shadow-md">
  <h2 className="font-extrabold text-3xl text-pink-500 pb-4">Add a New Product</h2>

  <div className="mb-4">
    <input
      type="text"
      value={product_name}
      onChange={(e) => setProduct_name(e.target.value)}
      placeholder="Enter Product Name"
      className="w-full p-4 text-pink-600 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 placeholder-pink-400 transition duration-300"
    />
  </div>

  <div className="mb-4">
    <input
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Enter Description"
      className="w-full p-4 text-pink-600 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 placeholder-pink-400 transition duration-300"
    />
  </div>

  <div className="mb-4">
    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      placeholder="Enter price"
      className="w-full p-4 text-pink-600 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 placeholder-pink-400 transition duration-300"
    />
  </div>

  <div className="mb-4">
    <input
      type="number"
      value={stock}
      onChange={(e) => setStock(e.target.value)}
      placeholder="Stock"
      className="w-full p-4 text-pink-600 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 placeholder-pink-400 transition duration-300"
    />
  </div>

  {/* Display error message */}
  {error && <p className="text-red-500 text-center font-semibold mb-4">{error}</p>}

  {/* Submit button */}
  <div className="text-center">
    <button
      onClick={handleCreateProduct}
      className="w-full p-4 border-2 rounded-lg bg-pink-500 font-semibold text-pink-100 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
    >
      Submit Product
    </button>
  </div>
</div>

      <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">Products</h1>

      {error && (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          console.log(product);
          return (
            <div
              key={product.product_id}
              className="border rounded-lg shadow-md p-4 bg-pink-100 border-pink-400"
            >
              <h2 className="text-xl font-bold text-pink-600 mb-2">
                {product.product_name}
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Description:</strong> {product.description || "No description available"}
              </p>
              <p className="text-gray-700">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="text-gray-700">
                <strong>Stock:</strong> {product.stock} units
              </p>
              <p className="text-gray-700">
                <strong>Created At:</strong> {new Date(product.created_at).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
