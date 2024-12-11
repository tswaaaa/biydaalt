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
      await axios.post("http://localhost:4000/users", {
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
    <div className="p-4">
      <h1 className="m-4 font-bold">Create a New Post</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter post title"
        className="p-4 mr-4 text-black"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter post title"
        className="p-4 mr-4 text-black"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter post title"
        className="p-4 mr-4 text-black"
      />
      {error && <p>{error}</p>}

      <button onClick={handleCreatePost} className="p-4 border rounded-lg">
        Create Post
      </button>

      <h2 className="m-2 font-bold">Posts</h2>
      <ul>
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg m-4 p-4">
            <p>{post.username}</p>
            <p>{post.email}</p>
            <p>{post.password}</p>
            <p>{post.created_at}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
