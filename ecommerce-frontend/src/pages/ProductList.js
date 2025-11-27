import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => setProducts(res.data));
  }, []);

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`http://localhost:5000/api/products/${id}`).then(() => {
        setProducts(products.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div className="container">
      <h1>Product List</h1>
      <Link to="/add-product">
        <button className="add-btn">+ Add Product</button>
      </Link>

      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            {p.image && (
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
                className="product-image"
              />
            )}
            <div className="product-info">
              <h3>{p.name}</h3>
              <p className="desc">{p.description}</p>
              <p className="price">₹{p.price}</p>
            </div>
            <div className="actions">
              <Link to={`/edit-product/${p.id}`}>
                <button className="edit-btn">Edit</button>
              </Link>
              <button className="delete-btn" onClick={() => deleteProduct(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }

        .add-btn {
          display: block;
          margin: 0 auto 30px auto;
          padding: 12px 25px;
          background: #28a745;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        .add-btn:hover {
          background: #218838;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .product-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }

        .product-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .product-info {
          padding: 15px;
          flex-grow: 1;
        }

        .product-info h3 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .desc {
          font-size: 14px;
          color: #555;
          margin-bottom: 10px;
        }

        .price {
          font-weight: bold;
          color: #222;
          margin-bottom: 10px;
        }

        .actions {
          display: flex;
          justify-content: space-around;
          padding: 10px;
          border-top: 1px solid #eee;
        }

        .edit-btn, .delete-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: 0.3s;
        }

        .edit-btn {
          background: #007bff;
          color: white;
        }
        .edit-btn:hover {
          background: #0056b3;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
        }
        .delete-btn:hover {
          background: #a71d2a;
        }

        @media (max-width: 600px) {
          .actions {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}

export default ProductList;
