import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirm } = formData;

    if (!username || !email || !password || !confirm) {
      setError("Заполните все поля.");
      setSuccess("");
      return;
    }

    if (password !== confirm) {
      setError("Пароли не совпадают.");
      setSuccess("");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          role: "USER", // роль по умолчанию
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Ошибка регистрации");
        setSuccess("");
        return;
      }

      setError("");
      setSuccess("Регистрация прошла успешно! Выполните вход.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Ошибка сети. Проверьте подключение к серверу.");
      setSuccess("");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Регистрация</h2>
        <p>Создайте новый аккаунт за пару секунд.</p>
        <form onSubmit={handleSubmit}>
          <label>Имя пользователя</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Придумайте логин"
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введите email"
          />
          <label>Пароль</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите пароль"
          />
          <label>Подтвердите пароль</label>
          <input
            name="confirm"
            type="password"
            value={formData.confirm}
            onChange={handleChange}
            placeholder="Повторите пароль"
          />
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