const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 4000;

// Middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());

// MySQL Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nest123$", //password
  database: "e_commerse",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Get all users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
    } else {
      res.json(results);
    }
  });
});

// Create a new user
app.post("/createUsers", (req, res) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).send("Error creating user");
    } else {
      res.status(201).json({ id: result.insertId, name, email });
    }
  });
});

// get all products
app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Error fetching products");
    } else {
      // Ensure price is a valid number
      results = results.map(product => ({
        ...product,
        price: parseFloat(product.price) || 0  // Default to 0 if price is not a valid number
      }));
      res.json(results);
    }
  });
});

// Create a new product
app.post("/createProduct", (req, res) => {
  const { product_name, description, price, stock } = req.body;
  const query = "INSERT INTO products (product_name, description, price, stock) VALUES (?, ?, ?, ?)";
  db.query(query, [product_name, description, price, stock], (err, result) => {
    if (err) {  
      console.error("Error creating review:", err);
      res.status(500).send("Error creating review");
    } else {
      res.status(201).json({ id: result.insertId, product_name, description, price, stock });
    }
  });
});


// Get all orders
app.get("/orders", (req, res) => {
  const query = "SELECT * FROM orders";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      res.status(500).send("Error fetching orders");
    } else {
      res.json(results);
    }
  });
});

// Get all order_items
app.get("/order_items", (req, res) => {
  const query = "SELECT * FROM order_items";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching order_items:", err);
      res.status(500).send("Error fetching order_items");
    } else {
      res.json(results);
    }
  });
});

// Get all reviews
app.get("/reviews", (req, res) => {
  const query = "SELECT * FROM reviews";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).send("Error fetching reviews");
    } else {
      res.json(results);
    }
  });
});

app.post("/createReview", (req, res) => {
  const { product_id, user_id, rating, review_text } = req.body;
  const query = "INSERT INTO reviews (product_id, user_id, rating, review_text) VALUES (?, ?, ?, ?)";
  db.query(query, [product_id, user_id, rating, review_text], (err, result) => {
    if (err) {  
      console.error("Error creating review:", err);
      res.status(500).send("Error creating review");
    } else {
      res.status(201).json({ id: result.insertId, rating, review_text });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
