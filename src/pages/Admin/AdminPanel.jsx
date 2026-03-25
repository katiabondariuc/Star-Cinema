import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("authUser") || "null");
    if (!auth || auth.role !== "admin") {
      navigate("/login", { replace: true });
      return;
    }
    setUser(auth);
  }, [navigate]);

  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [contentType, setContentType] = useState("movies");
  const [contentTitle, setContentTitle] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [contentEditId, setContentEditId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/");
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    setUsers(storedUsers.length ? storedUsers : [
      { id: 1, username: "admin", role: "admin", active: true },
      { id: 2, username: "user1", role: "user", active: true },
      { id: 3, username: "user2", role: "user", active: false },
    ]);

    setMovies([
      { id: 1, title: "Интерстеллар", description: "Космическая драма", active: true },
      { id: 2, title: "Начало", description: "Триллер о снах", active: true },
    ]);

    setSeries([
      { id: 1, title: "Игра престолов", description: "Фэнтези-драма", active: true },
      { id: 2, title: "Черное зеркало", description: "Антология научной фантастики", active: true },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("mockUsers", JSON.stringify(users));
  }, [users]);

  const refreshUsers = () => {
    const updated = users.map((user) => user);
    setUsers(updated);
  };

  const toggleUserActive = (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
  };

  const deleteUser = (id) => {
    if (window.confirm("Удалить пользователя?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const promoteDemote = (id) => {
    setUsers((prev) => prev.map((u) => {
      if (u.id !== id) return u;
      if (u.username === "admin") return u;
      return { ...u, role: u.role === "user" ? "admin" : "user" };
    }));
  };

  const activeContent = contentType === "movies" ? movies : series;

  const deleteContent = (id) => {
    if (contentType === "movies") {
      setMovies((prev) => prev.filter((item) => item.id !== id));
    } else {
      setSeries((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const editContent = (item) => {
    setContentTitle(item.title);
    setContentDescription(item.description);
    setContentEditId(item.id);
  };

  const cancelEdit = () => {
    setContentTitle("");
    setContentDescription("");
    setContentEditId(null);
  };

  const saveContent = (e) => {
    e.preventDefault();
    if (!contentTitle.trim()) return;

    if (contentEditId) {
      const updater = (item) => item.id === contentEditId ? { ...item, title: contentTitle, description: contentDescription } : item;
      if (contentType === "movies") setMovies((prev) => prev.map(updater));
      if (contentType === "series") setSeries((prev) => prev.map(updater));
    } else {
      const newItem = {
        id: Date.now(),
        title: contentTitle,
        description: contentDescription,
        active: true,
      };
      if (contentType === "movies") setMovies((prev) => [...prev, newItem]);
      if (contentType === "series") setSeries((prev) => [...prev, newItem]);
    }

    cancelEdit();
  };

  const mockStats = {
    users: users.length,
    movies: movies.length,
    series: series.length,
    viewers: 12452,
  };

  if (!user) return null;

  return (
    <section className="admin-page">
      <div className="admin-card">
        <div className="admin-header">
          <h1>Панель администратора</h1>
          <div className="admin-actions">
            <button className="btn-secondary" onClick={handleLogout}>Выйти</button>
            <Link to="/" className="btn-light">На главную</Link>
          </div>
        </div>

        <p>Здравствуйте, <strong>{user.username}</strong>. Здесь вы можете управлять сайтом.</p>
        <div className="stats-grid">
          <div className="stat-card"><h3>{mockStats.users}</h3><p>Пользователей</p></div>
          <div className="stat-card"><h3>{mockStats.movies}</h3><p>Фильмов</p></div>
          <div className="stat-card"><h3>{mockStats.series}</h3><p>Сериалов</p></div>
          <div className="stat-card"><h3>{mockStats.viewers}</h3><p>Зрителей</p></div>
        </div>

        <div className="admin-section">
          <h2>Управление пользователями</h2>
          <table className="admin-table">
            <thead><tr><th>id</th><th>Логин</th><th>Роль</th><th>Статус</th><th>Действия</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className={u.active ? "" : "row-inactive"}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>{u.active ? "Активен" : "Заблокирован"}</td>
                  <td>
                    <button onClick={() => toggleUserActive(u.id)}>{u.active ? "Блок" : "Разблок"}</button>
                    <button onClick={() => promoteDemote(u.id)}>{u.role === "user" ? "Сделать админом" : "Сделать юзером"}</button>
                    {u.username !== "admin" && <button onClick={() => deleteUser(u.id)}>Удалить</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn-mini" onClick={refreshUsers}>Обновить список</button>
        </div>

        <div className="admin-section">
          <h2>Управление контентом</h2>
          <div className="content-tabs">
            <button className={contentType === "movies" ? "active" : ""} onClick={() => setContentType("movies")}>Фильмы</button>
            <button className={contentType === "series" ? "active" : ""} onClick={() => setContentType("series")}>Сериалы</button>
          </div>

          <div className="content-form">
            <form onSubmit={saveContent}>
              <input value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} placeholder="Название" />
              <input value={contentDescription} onChange={(e) => setContentDescription(e.target.value)} placeholder="Описание" />
              <button type="submit">{contentEditId ? "Сохранить" : "Добавить"}</button>
              {contentEditId && <button type="button" onClick={cancelEdit}>Отмена</button>}
            </form>
          </div>

          <table className="admin-table">
            <thead><tr><th>id</th><th>Название</th><th>Описание</th><th>Статус</th><th>Действия</th></tr></thead>
            <tbody>
              {activeContent.map((item) => (
                <tr key={item.id} className={item.active ? "" : "row-inactive"}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.active ? "Активно" : "Откл."}</td>
                  <td>
                    <button onClick={() => editContent(item)}>Редактировать</button>
                    <button onClick={() => deleteContent(item.id)}>Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
