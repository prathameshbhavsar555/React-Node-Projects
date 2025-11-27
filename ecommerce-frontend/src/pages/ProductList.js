import React, { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList(){
  const [products,setProducts] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/products").then(res=> setProducts(res.data));
  },[]);

  const deleteProduct = (id)=>{
    axios.delete(`http://localhost:5000/api/products/${id}`).then(()=>{
      setProducts(products.filter(p=>p.id!==id));
    });
  };

  return (
    <div>
      <h1>Products</h1>
      <Link to="/add-product">
  <button>Add Product</button>
</Link>
      {products.map(p=>(
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>₹{p.price}</p>
          {p.image && <img src={`http://localhost:5000/uploads/${p.image}`} width="100"/>}
          <Link to={`/edit-product/${p.id}`}>Edit</Link>
          <button onClick={()=>deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default ProductList;
