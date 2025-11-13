import React, { useEffect, useState } from "react";

export default function OrderHistoryPage({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/orders/${user.login}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch(() => setOrders([]));
    }
  }, [user]);

  if (!orders.length) {
    return <h2 style={{ textAlign: "center" }}>У вас пока нет заказов</h2>;
  }

  return (
    <div className="orders-page">
      <h1>История заказов</h1>
      {orders.map((o) => (
        <div key={o.id} className="order-card">
          <h3>Заказ №{o.id}</h3>
          <ul>
            {o.items.map((item) => (
              <li key={item.id}>{item.name} — {item.price} ₸</li>
            ))}
          </ul>
          <strong>Итого: {o.total} ₸</strong>
        </div>
      ))}
    </div>
  );
}
