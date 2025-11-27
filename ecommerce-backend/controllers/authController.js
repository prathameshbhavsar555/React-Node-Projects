const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret";

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [user] = await db.query(
      "SELECT * FROM users WHERE email = ?", 
      [email]
    );

    if (user.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [name, email, hashPass]
    );

    res.status(201).json({ message: "Registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await db.query("SELECT * FROM users WHERE email=?", [email]);

    if (result.length === 0)
      return res.status(400).send({ message: "User not found" });

    const valid = await bcrypt.compare(password, result[0].password);

    if (!valid)
      return res.status(400).send({ message: "Invalid password" });

    res.send({ message: "Login success" });

  } catch (err) {
    res.status(500).send(err);
  }
};
