const db = require("../config/db");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const [product] = await db.query(
      "SELECT * FROM products WHERE id=?",
      [req.params.id]
    );
    if (product.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(product[0]);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Add product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : "";

    await db.query(
      "INSERT INTO products (name, description, price, category, image) VALUES (?,?,?,?,?)",
      [name, description, price, category, image]
    );

    res.json({ message: "Product added" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    let sql = image
      ? "UPDATE products SET name=?, description=?, price=?, category=?, image=? WHERE id=?"
      : "UPDATE products SET name=?, description=?, price=?, category=? WHERE id=?";
    const params = image
      ? [name, description, price, category, image, req.params.id]
      : [name, description, price, category, req.params.id];

    await db.query(sql, params);

    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id=?", [req.params.id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

