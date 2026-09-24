import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router";

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("buyer");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/signup", {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                phone: phone,
                role: role
            });

            if (response.data.status === "success") {
                alert("Signup Successfully")
                navigate("/login");
            } else {
                setError(response.data.message || "Signup failed");
            }
        } catch (err) {
            console.log("error", err);
            setError("Something went wrong");
        }
    };

    return (
    <div className="auth-container">
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>

            {error && <p className="error-text">{error}</p>}

            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

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

            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
            </select>

            <button type="submit">Signup</button>
        </form>
    </div>
);
}

export default Signup;