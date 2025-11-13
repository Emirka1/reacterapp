import React, { useState } from "react";
import "../App.css";

export default function CartPage({ cart, setCart, user }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrder = async () => {
    if (!user) {
      alert("Пожалуйста, войдите в аккаунт");
      return;
    }
    if (cart.length === 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/order/${user.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, total }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Спасибо! Ваш заказ успешно оформлен");
        setCart([]); 
      } else {
        alert("Ошибка при оформлении заказа: " + (data.error || "Неизвестная ошибка"));
      }
    } catch (err) {
      alert("Ошибка соединения с сервером");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !successMessage) {
    return <h2 className="cart-empty">Ваша корзина пуста</h2>;
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Ваша корзина</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-card">
            <img src={item.image} alt={item.name} className="cart-img" />
            <div className="cart-details">
              <h3>{item.name}</h3>
              <p className="cart-category">{item.category}</p>
              <p className="cart-price">{item.price.toLocaleString()} ₸</p>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              DELETE
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Итого: {total.toLocaleString()} ₸</h2>
        {!successMessage ? (
          <button
            className="order-btn"
            onClick={handleOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Оформляем..." : "Оформить заказ"}
          </button>
        ) : (
          <h3 className="order-success">{successMessage}</h3>
        )}
      </div>
    </div>
  );
}
