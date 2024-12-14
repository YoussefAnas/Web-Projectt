const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt'); 

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1); 
  } else {
    console.log('Connected to SQLite database.');

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



app.post('/api/register', (req, res) => {
  console.log('Received POST request to /api/register');
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required!' });
  }


  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to hash password.' });
    }

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


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

 
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required!' });
  }

 
  const query = 'SELECT * FROM register WHERE name = ?';
  db.get(query, [username], (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to verify credentials.' });
    }

    if (row) {
      
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


app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching products:', err.message);
      return res.status(500).json({ error: 'Failed to fetch products.' });
    }

    
    res.json(rows);
  });
});


app.post('/api/products', (req, res) => {
  const { name, price } = req.body;

  
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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
