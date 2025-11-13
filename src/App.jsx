import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import RecommendationsPage from "./pages/RecommendationsPage";

import Footer from "./components/Footer";
import FlowerPage from "./pages/FlowerPage";
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [flowers, setFlowers] = useState([]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/flowers")
      .then((res) => res.json())
      .then((data) => setFlowers(data))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/cart/${user.login}`)
        .then((res) => res.json())
        .then((data) => setCart(data))
        .catch(() => setCart([]));
    }
  }, [user]);

  const filteredFlowers = flowers.filter((f) => {
    const matchName = f.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "Все" || f.category === category;
    return matchName && matchCategory;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="app">
        <Header
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          user={user}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<Main flowers={filteredFlowers} cart={cart} setCart={setCart} user={user} />} />
          <Route path="/flower/:id" element={<FlowerPage flowers={flowers} />} />
          <Route path="/cart" element={user ? <CartPage user={user} cart={cart} setCart={setCart} /> : <Navigate to="/login" />} />
          <Route path="/orders" element={user ? <OrderHistoryPage user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
		  <Route path="/recommendations" element={user ? <RecommendationsPage user={user} /> : <Navigate to="/login" />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
