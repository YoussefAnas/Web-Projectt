const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt'); // For password hashing

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1); // Exit if the database connection fails
  } else {
    console.log('Connected to SQLite database.');

    // Create Register Table for User Registration
    db.run(
      `CREATE TABLE IF NOT EXISTS register (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) console.error(err.message);
      }
    );

    // Create Products Table if not exists
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
      )`,
      (err) => {
        if (err) console.error(err.message);
      }
    );
  }
});

// API Endpoints

// Register a new user
app.post('/api/register', (req, res) => {
  console.log('Received POST request to /api/register');
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required!' });
  }

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to hash password.' });
    }

    // Insert user into the register table
    const insert = 'INSERT INTO register (name, email, password) VALUES (?, ?, ?)';
    db.run(insert, [name, email, hashedPassword], function (err) {
      if (err) {
        console.error(err.message);
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ message: 'Email is already registered.' });
        }
        return res.status(500).json({ error: 'Failed to register user.' });
      } else {
        console.log(`User registered: ${name}, ${email}`);
        res.json({ message: 'User registered successfully!' });
      }
    });
  });
});

// Login a user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required!' });
  }

  // Fetch user from database
  const query = 'SELECT * FROM register WHERE name = ?';
  db.get(query, [username], (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to verify credentials.' });
    }

    if (row) {
      // Compare hashed password with the stored one
      bcrypt.compare(password, row.password, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Failed to verify credentials.' });
        }

        if (result) {
          return res.json({ message: 'Login successful!' });
        } else {
          return res.status(400).json({ error: 'Invalid credentials' });
        }
      });
    } else {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  });
});

// GET request to retrieve all products
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching products:', err.message);
      return res.status(500).json({ error: 'Failed to fetch products.' });
    }

    // Send the product list as a response
    res.json(rows);
  });
});

// POST request to add a new product
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;

  // Validate input
  if (!name || !price) {
    return res.status(400).json({ error: 'Product name and price are required.' });
  }

  const insert = 'INSERT INTO products (name, price) VALUES (?, ?)';

  db.run(insert, [name, price], function (err) {
    if (err) {
      console.error('Error inserting product:', err.message);
      return res.status(500).json({ error: 'Failed to add product.' });
    }

    console.log(`Product added: ${name}, ${price}`);
    res.json({ message: 'Product added successfully!', productId: this.lastID });
  });
});

// DELETE request to remove a product by ID
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  const deleteQuery = 'DELETE FROM products WHERE id = ?';

  db.run(deleteQuery, [productId], function (err) {
    if (err) {
      console.error('Error deleting product:', err.message);
      return res.status(500).json({ error: 'Failed to delete product.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    console.log(`Product with ID ${productId} deleted.`);
    res.json({ message: `Product with ID ${productId} deleted successfully.` });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
