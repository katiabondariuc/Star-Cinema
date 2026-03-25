import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirm } = formData;

    if (!username || !password || !confirm) {
      setError("Заполните все поля.");
      setSuccess("");
      return;
    }

    if (password !== confirm) {
      setError("Пароли не совпадают.");
      setSuccess("");
      return;
    }

    const users = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    const isDuplicate = users.some((u) => u.username === username);
    if (isDuplicate) {
      setError("Пользователь с таким именем уже существует.");
      setSuccess("");
      return;
    }

    const newUser = { username, password, role: username === "admin" ? "admin" : "user" };
    localStorage.setItem("mockUsers", JSON.stringify([...users, newUser]));

    setError("");
    setSuccess("Регистрация прошла успешно! Выполните вход.");
    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Регистрация</h2>
        <p>Создайте новый аккаунт за пару секунд.</p>
        <form onSubmit={handleSubmit}>
          <label>Имя пользователя</label>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Придумайте логин" />
          <label>Пароль</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Введите пароль" />
          <label>Подтвердите пароль</label>
          <input name="confirm" type="password" value={formData.confirm} onChange={handleChange} placeholder="Повторите пароль" />
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <button type="submit" className="btn-primary">Зарегистрироваться</button>
        </form>
        <div className="helper-text">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
