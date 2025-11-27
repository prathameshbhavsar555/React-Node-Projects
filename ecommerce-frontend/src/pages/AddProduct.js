import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", desc);
      formData.append("price", price);
      formData.append("category", category);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/products");
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add New Product</h2>
      {error && <p className="error">{error}</p>}
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Product Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="preview" />}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* Internal CSS */}
      <style>{`
        .container {
          max-width: 500px;
          margin: 50px auto;
          padding: 30px;
          background: #f7f8fa;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .title {
          text-align: center;
          margin-bottom: 25px;
          color: #333;
        }
        .error {
          color: #d93025;
          margin-bottom: 15px;
          text-align: center;
        }
        .product-form .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        }
        .product-form label {
          margin-bottom: 6px;
          font-weight: 500;
          color: #555;
        }
        .product-form input[type="text"],
        .product-form input[type="number"],
        .product-form textarea {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 14px;
          transition: 0.3s;
        }
        .product-form input[type="text"]:focus,
        .product-form input[type="number"]:focus,
        .product-form textarea:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0,123,255,0.3);
        }
        .product-form textarea {
          resize: vertical;
          min-height: 80px;
        }
        .product-form input[type="file"] {
          padding: 5px 0;
        }
        .preview {
          margin-top: 10px;
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        .product-form button {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: #fff;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }
        .product-form button:hover {
          background-color: #0056b3;
        }
        .product-form button:disabled {
          background-color: #7baaf7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default AddProduct;
