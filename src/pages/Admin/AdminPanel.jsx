import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [contentType, setContentType] = useState("movies");
  const [contentTitle, setContentTitle] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [contentEditId, setContentEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("authUser") || "null");
    if (!auth || auth.role.toUpperCase() !== "ADMIN") {
      navigate("/login", { replace: true });
      return;
    }
    setUser(auth);
  }, [navigate]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };
  };

  const checkAuth = (response) => {
    if (response.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    navigate("/");
  };

  // Универсальная функция для извлечения массива из ответа API
  const extractArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.items)) return data.items;
    if (Array.isArray(data.users)) return data.users;
    if (Array.isArray(data.results)) return data.results;
    console.error("Некорректный формат данных:", data);
    return [];
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/users", {
        headers: getAuthHeaders(),
      });
      if (!checkAuth(response)) return;

      if (response.ok) {
        const data = await response.json();
        setUsers(extractArray(data));
      } else {
        console.error("Ошибка загрузки пользователей:", response.status);
        setUsers([]);
      }
    } catch (err) {
      console.error("Ошибка сети при загрузке пользователей:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/movies", {
        headers: getAuthHeaders(),
      });
      if (!checkAuth(response)) return;

      if (response.ok) {
        const data = await response.json();
        setMovies(extractArray(data));
      } else {
        console.error("Ошибка загрузки фильмов:", response.status);
        setMovies([]);
      }
    } catch (err) {
      console.error("Ошибка сети при загрузке фильмов:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeries = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/movies?type=series", {
        headers: getAuthHeaders(),
      });
      if (!checkAuth(response)) return;

      if (response.ok) {
        const data = await response.json();
        setSeries(extractArray(data));
      } else {
        console.error("Ошибка загрузки сериалов:", response.status);
        setSeries([]);
      }
    } catch (err) {
      console.error("Ошибка сети при загрузке сериалов:", err);
      setSeries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchMovies();
    fetchSeries();
  }, []);

  const refreshUsers = () => fetchUsers();

  const deleteUser = async (id) => {
    if (!window.confirm("Удалить пользователя?")) return;
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (checkAuth(response) && response.ok) fetchUsers();
      else console.error("Ошибка удаления:", response.status);
    } catch (err) {
      console.error("Ошибка сети при удалении пользователя:", err);
    }
  };

  const promoteDemote = async (id) => {
    const u = users.find(u => u.id === id);
    if (!u || u.username === "admin") return;
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ role: u.role === "user" ? "admin" : "user" }),
      });
      if (checkAuth(response) && response.ok) fetchUsers();
      else console.error("Ошибка изменения роли:", response.status);
    } catch (err) {
      console.error("Ошибка сети при изменении роли:", err);
    }
  };

  const deleteContent = async (id) => {
    const endpoint = "movies"; // можно добавить "series", если нужно
    try {
      const response = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (checkAuth(response) && response.ok) {
        contentType === "movies" ? fetchMovies() : fetchSeries();
      } else console.error("Ошибка удаления контента:", response.status);
    } catch (err) {
      console.error("Ошибка сети при удалении контента:", err);
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

  const saveContent = async (e) => {
    e.preventDefault();
    if (!contentTitle.trim()) return;

    const endpoint = "movies"; // можно добавить "series", если нужно
    const method = contentEditId ? "PUT" : "POST";
    const url = contentEditId
      ? `http://localhost:3000/${endpoint}/${contentEditId}`
      : `http://localhost:3000/${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({ title: contentTitle, description: contentDescription }),
      });
      if (checkAuth(response) && response.ok) {
        contentType === "movies" ? fetchMovies() : fetchSeries();
        cancelEdit();
      } else console.error("Ошибка сохранения контента:", response.status);
    } catch (err) {
      console.error("Ошибка сети при сохранении контента:", err);
    }
  };

  const activeContent = contentType === "movies" ? movies : series;

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
          {loading && <p>Загрузка...</p>}
          <table className="admin-table">
            <thead><tr><th>id</th><th>Логин</th><th>Роль</th><th>Действия</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => promoteDemote(u.id)}>
                      {u.role === "user" ? "Сделать админом" : "Сделать юзером"}
                    </button>
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

          {loading && <p>Загрузка...</p>}
          <table className="admin-table">
            <thead><tr><th>id</th><th>Название</th><th>Описание</th><th>Статус</th><th>Действия</th></tr></thead>
            <tbody>
              {activeContent.map(item => (
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
          <button className="btn-mini" onClick={() => { contentType === "movies" ? fetchMovies() : fetchSeries(); }}>Обновить список</button>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;