import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [image, setImage] = useState(null);

  // Fetch existing product details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setName(res.data.name);
        setDesc(res.data.description);
        setPrice(res.data.price);
        setCategory(res.data.category);
        setOldImage(res.data.image);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("category", category);
    if (image) formData.append("image", image);

    await axios.put(`http://localhost:5000/api/products/${id}`, formData);
    navigate("/products");
  };

  return (
    <div className="edit-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
          />
        </div>

        <div className="form-group">
          <label>Old Image</label>
          {oldImage && (
            <img
              src={`http://localhost:5000/uploads/${oldImage}`}
              alt="Old"
              className="image-preview"
            />
          )}
        </div>

        <div className="form-group">
          <label>Change Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <button type="submit" className="update-btn">
          Update Product
        </button>
      </form>

      {/* Internal CSS */}
      <style>{`
        .edit-container {
          max-width: 500px;
          margin: 50px auto;
          padding: 30px;
          background: #f7f8fa;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #333;
        }

        .edit-form .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        }

        .edit-form label {
          margin-bottom: 6px;
          font-weight: 500;
          color: #555;
        }

        .edit-form input[type="text"],
        .edit-form input[type="number"],
        .edit-form textarea,
        .edit-form input[type="file"] {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 14px;
          outline: none;
          transition: 0.3s;
        }

        .edit-form input[type="text"]:focus,
        .edit-form input[type="number"]:focus,
        .edit-form textarea:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0,123,255,0.3);
        }

        .edit-form textarea {
          resize: vertical;
          min-height: 80px;
        }

        .image-preview {
          margin-top: 10px;
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .update-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(45deg, #007bff, #00d4ff);
          color: #fff;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        .update-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        @media (max-width: 480px) {
          .edit-container {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default EditProduct;
