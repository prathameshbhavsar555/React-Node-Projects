// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My E-Commerce App</h1>
      <p>Shop your favorite products online!</p>

      <div className="button-group">
        <Link to="/login">
          <button className="home-btn">Login</button>
        </Link>

        <Link to="/register">
          <button className="home-btn">Register</button>
        </Link>

        <Link to="/products">
          <button className="home-btn">Browse Products</button>
        </Link>
      </div>

      {/* Internal CSS */}
      <style>{`
        .home-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          background: linear-gradient(to bottom, #f8f8f8, #e0eafc);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
        }

        .home-container h1 {
          font-size: 36px;
          color: #333;
          margin-bottom: 15px;
        }

        .home-container p {
          font-size: 18px;
          color: #555;
          margin-bottom: 30px;
        }

        .button-group {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .home-btn {
          padding: 12px 25px;
          font-size: 16px;
          color: #fff;
          background: linear-gradient(45deg, #007bff, #00d4ff);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        .home-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        .home-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        @media (max-width: 480px) {
          .button-group {
            flex-direction: column;
          }
          .home-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
