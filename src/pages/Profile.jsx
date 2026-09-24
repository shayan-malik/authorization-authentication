import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router";

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await api.get("/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.status === "success") {
                    setUser(response.data.user);
                } else {
                    setError("Failed to load profile");
                }
            } catch (err) {
                console.log("error", err);
                navigate("/login");
            }
        };

        fetchProfile();
    }, [navigate]);

    // const handleLogout = () => {
    //     localStorage.removeItem("token");
    //     navigate("/login");
    // };

    if (error) return <p className="error-text">{error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div className="">
            <h2 style={{textAlign: "center"}}>Profile Page</h2>
            {/* <p><strong>Name:</strong> {user.first_name} {user.last_name}</p> */}
            {/* <p><strong>Email:</strong> {user.email}</p> */}
            {/* <p><strong>Phone:</strong> {user.phone}</p> */}
            {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
    );
}

export default Profile;