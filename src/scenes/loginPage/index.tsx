import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", formData);
      const { token } = response.data;
      // Token'i local storage'e kaydedebilirsin
      localStorage.setItem("token", token);
      // Giriş başarılıysa farklı bir sayfaya yönlendir
      history.push("/dashboard"); // Örnek bir yönlendirme
    } catch (error) {
      console.error("Login failed", error);
      // Hata durumunda mesaj gösterilebilir veya başka bir işlem yapılabilir
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
