import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function UpdateProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const Navigate = useNavigate();

  async function fetchProduct() {
    const response = await fetch(`http://localhost:5000/showproduct/${id}`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    const result = await response.json();
    setName(result.name);
    setPrice(result.price);
    setCompany(result.company);
    setCategory(result.category);

    console.log(result);
  }
  useEffect(() => {
    fetchProduct();
  }, []);
  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:5000/updateproduct/${id}`, {
      method: "put",
      body: JSON.stringify({
        name,
        price,
        company,
        category,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    const result = await response.json();
    if (result.acknowledged) {
      alert("product updated successfully");
      Navigate("/");
    }
  };
  //   const handleSubmit = async () => {
  //     if (!name || !price || !company || !category) {
  //       setError(true);
  //       return false;
  //     }
  //     console.log(name, price, company, userId, category);
  //     const response = await fetch("http://localhost:5000/addproduct", {
  //       method: "post",
  //       body: JSON.stringify({
  //         name,
  //         price,
  //         company,
  //         category,
  //         userId,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const result = await response.json();
  //     console.log(result);
  //     alert("data added successfully");
  //     setName("");
  //     setCategory("");
  //     setCompany("");
  //     setPrice("");
  //   };
  return (
    <div className="container">
      <div className="form">
        <h1>Update Product</h1>
        <div className="label-input-box">
          <label htmlFor="name">Name</label>
          <input
            className="input-field"
            type="text"
            id="name"
            placeholder="Product name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="label-input-box">
          <label htmlFor="price">Price</label>
          <input
            className="input-field"
            type="text"
            id="price"
            placeholder="Product price*"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="label-input-box">
          <label htmlFor="category">Category</label>
          <input
            className="input-field"
            type="text"
            id="category"
            placeholder="Product category*"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="label-input-box">
          <label htmlFor="company">Company</label>
          <input
            className="input-field"
            type="text"
            id="company"
            placeholder="Product company*"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <button className="submit" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default UpdateProduct;
