import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router";

function Signup () {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("buyer");
    const [error, setError] = useState("");

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const response = await api.post('/signup', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                phone: phone,
                role: role
            });

            if(response.data.status === "success"){
                navigate("/login")
            }
            else{
                setError(response.data.message || "Signup Failed");
            }


        }
        catch(error){
            console.log("error", error);
            setError("Something went wrong")
        }

    }


    return(
        <>
        <div className="page-wrapper">
        <div className="auth-card">
        <h1>Signup</h1>
            <form onSubmit={handleSubmit}>

                {error && <p className="error-text">{error}</p>}

                <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" name="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>

                <button type="submit">Signup</button>

            </form>
            
                <p className="switch-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>

            </div>
        </div>
        </>

    )

}

export default Signup;