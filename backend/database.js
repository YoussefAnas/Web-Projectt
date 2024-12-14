const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    return console.error('Error opening database:', err.message);
  }
  console.log('Connected to SQLite database.');

  db.run(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )`,
    (err) => {
      if (err) return console.error('Error creating products table:', err.message);
      console.log('Products table created or already exists.');

      
    }
  );

  

  db.run(
    `CREATE TABLE IF NOT EXISTS register (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`,
    (err) => {
      if (err) return console.error('Error creating register table:', err.message);
      console.log('Register table created or already exists.');
    }
  );
});

db.close((err) => {
  if (err) {
    return console.error('Error closing database:', err.message);
  }
  console.log('Database connection closed.');
});
