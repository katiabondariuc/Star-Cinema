import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    // Статический админ без регистрации
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("authUser", JSON.stringify({ username: "admin", role: "admin" }));
      setError("");
      navigate("/admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
      setError("Неверное имя пользователя или пароль.");
      return;
    }

    localStorage.setItem("authUser", JSON.stringify({ username: user.username, role: user.role }));
    setError("");

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Вход</h2>
        <p>Авторизуйтесь, чтобы продолжить.</p>
        <form onSubmit={handleSubmit}>
          <label>Имя пользователя</label>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Введите логин" />
          <label>Пароль</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Введите пароль" />
          {error && <div className="error">{error}</div>}
          <button type="submit" className="btn-primary">Войти</button>
        </form>
        <div className="helper-text">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
