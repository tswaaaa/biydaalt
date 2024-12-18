import { useState, useEffect } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/orders");
        setOrders(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
        <header className="flex justify-between items-center bg-pink-500 p-4 mb-10">
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
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">Orders</h1>

      {error && (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {orders.map((order) => (
          <div
            key={order.order_id}
            className="border rounded-lg shadow-md p-4 bg-pink-100 border-pink-400"
          >
            <h2 className="text-xl font-bold text-pink-600 mb-2">Order #{order.order_id}</h2>
            <p className="text-gray-700 mb-2">
              <strong>User ID:</strong> {order.user_id}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Order Date:</strong>{" "}
              {new Date(order.order_date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Total Amount:</strong> ${order.total_amount}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
