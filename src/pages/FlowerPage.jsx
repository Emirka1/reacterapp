import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

export default function FlowerPage({ flowers }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const flower = flowers.find((f) => f.id === Number(id));

  if (!flower) {
    return <h2>Цветок не найден</h2>;
  }

  return (
    <div className="flower-page">
      <img src={flower.image} alt={flower.name} className="flower-image" />
      <h1>{flower.name}</h1>
      <p>Категория: {flower.category}</p>
      <p>Цена: {flower.price} ₸</p>
      <p className="description">
        {flower.description || "Описание скоро появится..."}
      </p>
      <button onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
}
