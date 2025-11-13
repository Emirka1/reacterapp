import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function LoginPage({ onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isRegister
      ? "http://localhost:5000/api/register"
      : "http://localhost:5000/api/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onLogin(data.user);
        navigate("/");
      } else {
        setError(data.error || "Ошибка");
      }
    } catch (err) {
      setError("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          {isRegister ? "Создайте аккаунт" : "Добро пожаловать"}
        </h1>
        <p className="login-subtitle">
          {isRegister
            ? "Заполните поля, чтобы зарегистрироваться"
            : "Введите данные для входа"}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>

        <p
          onClick={() => setIsRegister(!isRegister)}
          className="toggle-link"
        >
          {isRegister
            ? "Уже есть аккаунт? Войти"
            : "Нет аккаунта? Зарегистрируйтесь"}
        </p>
      </div>
    </div>
  );
}
