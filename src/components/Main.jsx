import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Main({ flowers, cart, setCart }) {
  const navigate = useNavigate();

  const addToCart = (flower) => {
    if (!cart.find((item) => item.id === flower.id)) {
      setCart([...cart, flower]);
    }
  };

  return (
    <main className="main">
      <div className="cart-btn-wrapper">
        <button className="go-cart" onClick={() => navigate("/cart")}>
          Перейти в корзину ({cart.length})
        </button>
      </div>

      {flowers.map((f) => (
        <div key={f.id} className="card">
          <img
            src={f.image}
            alt={f.name}
            onClick={() => navigate(`/flower/${f.id}`)}
            style={{ cursor: "pointer" }}
          />
          <div className="card-content">
            <h3>{f.name}</h3>
            <p className="category">{f.category}</p>
            <p className="price">{f.price} ₸</p>
            <button onClick={() => addToCart(f)}>Добавить в корзину</button>
          </div>
        </div>
      ))}
    </main>
  );
}
