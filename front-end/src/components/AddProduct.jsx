import React, { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const handleSubmit = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }
    console.log(name, price, company, userId, category);
    const response = await fetch("http://localhost:5000/addproduct", {
      method: "post",
      body: JSON.stringify({
        name,
        price,
        company,
        category,
        userId,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    const result = await response.json();
    console.log(result);
    alert("data added successfully");
    setName("");
    setCategory("");
    setCompany("");
    setPrice("");
  };
  return (
    <div className="container">
      <div className="form">
        <h1>Add Product</h1>
        <input
          className="input-field"
          type="text"
          placeholder="Product name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className="error-msg">please enter product name</span>
        )}
        <input
          className="input-field"
          type="text"
          placeholder="Product price*"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span className="error-msg">please enter product price</span>
        )}
        <input
          className="input-field"
          type="text"
          placeholder="Product category*"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && (
          <span className="error-msg">please enter product category</span>
        )}
        <input
          className="input-field"
          type="text"
          placeholder="Product company*"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && (
          <span className="error-msg">please enter product company</span>
        )}
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
