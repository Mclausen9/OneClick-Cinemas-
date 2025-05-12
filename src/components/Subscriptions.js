import React from "react";
import list from "./data";

function Subscriptions({ addToCart }) {
  return (
    <div className="subscriptions-container">
      <h1>Subscriptions & Accessories</h1>
      <div className="subscriptions-list">
        {list.map((product) => (
          <div key={product.id} style={productCard}>
            <h3>{product.service}</h3>
            <p>{product.serviceInfo}</p>
            <p><strong>${product.price}</strong></p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const productCard = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  width: '200px',
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
  boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)',
};

export default Subscriptions;
