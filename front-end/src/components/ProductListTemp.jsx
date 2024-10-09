import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [productlist, setProductList] = useState([{}]);
  const Navigate = useNavigate();
  async function fetchProduct() {
    const response = await fetch("http://localhost:5000/showproducts");
    const result = await response.json();
    setProductList(result);

    console.log(result);
  }
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/deleteproduct/${id}`, {
      method: "delete",
    });
    const result = await response.json();
    if (result.acknowledged) {
      alert("item deleted successfully");
      fetchProduct();
    } else {
      alert("error occured");
    }
  };
  return (
    <div className="container">
      <h1>Product List</h1>
      <div className="table">
        <ul className="table-list">
          <li>SNo.</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>Action</li>
        </ul>
        {productlist.map((product, index) => (
          <ul key={product._id} className="table-list">
            {console.log(typeof product._id)}
            <li>{index + 1}</li>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li>{product.category}</li>
            <li>{product.company}</li>
            <li className="action">
              <button
                className="action-btn"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
              <button
                className="action-btn"
                onClick={() => Navigate(`/update/${product._id}`)}
              >
                Update
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
