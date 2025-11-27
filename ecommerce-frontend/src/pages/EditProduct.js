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

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    await axios.put(`http://localhost:5000/api/products/${id}`, formData);

    navigate("/products");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />

        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          required
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />

        <p>Old Image:</p>
        {oldImage && (
          <img
            src={`http://localhost:5000/uploads/${oldImage}`}
            alt="Old"
            width="120"
            style={{ marginBottom: "10px" }}
          />
        )}

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
