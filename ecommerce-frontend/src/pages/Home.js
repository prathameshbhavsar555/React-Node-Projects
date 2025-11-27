// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f8f8",
      }}
    >
      <h1>Welcome to My E-Commerce App</h1>
      <p>Shop your favorite products online!</p>

      <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
        <Link to="/login">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Login
          </button>
        </Link>

        <Link to="/register">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Register
          </button>
        </Link>

        <Link to="/products">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Browse Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
