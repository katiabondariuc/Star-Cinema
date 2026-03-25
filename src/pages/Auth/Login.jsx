import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Ошибка авторизации");
        return;
      }

      const data = await response.json();

      // Проверка роли
      const role = data.role ? data.role.toUpperCase() : "USER";

      // Сохраняем токен и данные пользователя
      localStorage.setItem("authToken", data.access_token);
      localStorage.setItem(
        "authUser",
        JSON.stringify({ username: data.username, role })
      );

      setError("");

      // Навигация по роли
      if (role === "ADMIN") navigate("/admin");
      else navigate("/");

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Ошибка сети. Проверьте подключение к серверу.");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Вход</h2>
        <p>Авторизуйтесь, чтобы продолжить.</p>
        <form onSubmit={handleSubmit}>
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