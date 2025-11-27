import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct(){
  const [name,setName] = useState("");
  const [desc,setDesc] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState("");
  const [image,setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",name);
    formData.append("description",desc);
    formData.append("price",price);
    formData.append("category",category);
    formData.append("image",image);

    await axios.post("http://localhost:5000/api/products", formData);
    navigate("/products");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e=>setName(e.target.value)} required/>
      <input placeholder="Description" onChange={e=>setDesc(e.target.value)} required/>
      <input type="number" placeholder="Price" onChange={e=>setPrice(e.target.value)} required/>
      <input placeholder="Category" onChange={e=>setCategory(e.target.value)} required/>
      <input type="file" onChange={e=>setImage(e.target.files[0])}/>
      <button type="submit">Add Product</button>
    </form>
  )
}

export default AddProduct;
