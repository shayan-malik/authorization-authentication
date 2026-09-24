import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/login", { email, password });

            if (response.data.status === "success") {
                localStorage.setItem("token", response.data.token);
                alert("Login SuccessFully");
                navigate("/profile");
            } else {
                setError(response.data.message || "Login failed");
            }
        } catch (err) {
            console.log("error", err);
            setError("Something went wrong");
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                {error && <p className="error-text">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;