import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [productlist, setProductList] = useState([]);
  const [query, setQuery] = useState("");
  const Navigate = useNavigate();
  async function fetchProduct() {
    const response = await fetch("http://localhost:5000/showproducts", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    const result = await response.json();
    setProductList(result);

    // console.log(result);
  }

  const searchQuery = async () => {
    const response = await fetch(`http://localhost:5000/search/${query}`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    const result = await response.json();
    setProductList(result);
  };
  // at first all data will be shown
  useEffect(() => {
    fetchProduct();
  }, []);

  // show data when query changes
  useEffect(() => {
    if (query) {
      searchQuery();
    } else {
      fetchProduct();
    }
  }, [query]);
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/deleteproduct/${id}`, {
      method: "delete",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    const result = await response.json();
    if (result.acknowledged) {
      alert("item deleted successfully");
      fetchProduct();
    } else {
      alert("error occured");
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    // if (query) {
    //   searchQuery();
    // } else {
    //   fetchProduct();
    // }

    console.log(query);
  };
  return (
    <div className="container">
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search here"
        value={query}
        className="search-input"
        onChange={handleSearch}
      />
      <div className="table">
        <ul className="table-list">
          <li>SNo.</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>Action</li>
        </ul>
        {productlist.length > 0 ? (
          productlist.map((product, index) => (
            <ul key={product._id} className="table-list">
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
          ))
        ) : (
          <p>Data not found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
