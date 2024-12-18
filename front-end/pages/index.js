import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Get request
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        console.log(response);

        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      }
    };

    fetchPosts();
  }, []);

  // Post request
  const handleCreatePost = async () => {
    try {
      await axios.post("http://localhost:4000/createUsers", {
        name,
        email,
        password,
      }); 

      setName("");
      setPassword("");
      setEmail("");
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
      <div className="p-6 bg-pink-50 rounded-lg shadow-lg">
  <h1 className="text-3xl font-extrabold text-pink-600 mb-6">Create a New Post</h1>

  {/* Name input */}
  <div className="mb-4">
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter post title"
      className="w-full p-4 text-pink-600 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 placeholder-pink-400 transition duration-300"
    />
  </div>

  {/* Email input */}
  <div className="mb-4">
    <input
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="w-full p-4 text-pink-600 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 placeholder-pink-400 transition duration-300"
    />
  </div>

  {/* Password input */}
  <div className="mb-6">
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      className="w-full p-4 text-pink-600 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 placeholder-pink-400 transition duration-300"
    />
  </div>

  {/* Error message */}
  {error && <p className="text-red-500 text-center font-semibold mb-4">{error}</p>}

  {/* Submit button */}
  <div className="text-center">
    <button
      onClick={handleCreatePost}
      className="w-full p-4 border-2 rounded-lg bg-pink-500 font-semibold text-pink-100 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
    >
      Create Post
    </button>
  </div>
</div>


      <h2 className="m-2 font-extrabold text-2xl py-4 pl-12 pt-8 text-pink-500">Posts</h2>
      <ul>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg shadow-md p-4 mx-6 bg-pink-100 border-pink-400">
            <p>{post.username}</p>
            <p>{post.email}</p>
            <p>{post.password}</p>
            <p>{post.created_at}</p>
          </div>
        ))}
        </div>
      </ul>
    </div>
  );
}
