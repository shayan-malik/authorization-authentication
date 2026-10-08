import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      if (response.data.status === "success") {
        navigate("/profile");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="auth-card">
          <h2>Login Page</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="error-text">{error}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>

          <p className="switch-link">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
