export default function Header({ search, setSearch, category, setCategory, user, onLogout }) {
  return (
    <header>
      <h1>Flower Shop Glamour</h1>
      <input
        type="text"
        placeholder="Поиск"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Все</option>
        <option>Букеты</option>
        <option>Весенние</option>
        <option>Полевые</option>
        <option>Экзотические</option>
      </select>

      <div className="user-section">
        {user ? (
          <>
            <span>Пользователь: {user.login}</span>
            <button onClick={onLogout}>Выйти</button>
          </>
        ) : (
          <a href="/login">Войти</a>
        )}
      </div>
    </header>
  );
}
