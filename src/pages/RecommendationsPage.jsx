import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecommendationsPage.css"; 

export default function RecommendationsPage({ user }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/api/recommendations/${user.login}`)
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки рекомендаций:", err);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return <p style={{ textAlign: "center" }}>Пожалуйста, войдите в аккаунт, чтобы получить рекомендации.</p>;
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Загрузка рекомендаций...</p>;
  }

  if (recommendations.length === 0) {
    return <p style={{ textAlign: "center" }}>Пока нет рекомендаций</p>;
  }

  return (
    <div className="recommendations-page">
      <h2>Товары, которые вам могут понравиться</h2>
      <div className="recommendations-grid">
        {recommendations.map((item) => (
          <div key={item.id} className="recommendation-card">
            <img src={item.image || "/no-image.jpg"} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.category}</p>
            <p className="price">{item.price} ₸</p>
            <Link to={`/flower/${item.id}`} className="details-btn">Подробнее</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
