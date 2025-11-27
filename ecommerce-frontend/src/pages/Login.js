import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save JWT Token
      localStorage.setItem("token", res.data.token);

      setMessage("Login successful!");

      // Redirect to products page
      window.location.href = "/products";
    } catch (err) {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>E-Commerce Login</h2>
        {message && <p style={styles.msg}>{message}</p>}

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button style={styles.btn} type="submit">
            Login
          </button>

          <p style={styles.register}>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

// Inline Styles (Simple & Clean)
const styles = {
  wrapper: {
    width: "100%",
    height: "100vh",
    background: "#f3f3f3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "350px",
    padding: "25px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  msg: {
    color: "red",
    textAlign: "center",
  },
  register: {
    marginTop: "10px",
    textAlign: "center",
  },
};
