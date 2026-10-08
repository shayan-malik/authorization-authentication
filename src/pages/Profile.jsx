import { useState, useEffect} from "react";
import api from "../api";
import { useNavigate } from "react-router";


function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    
    const handleEditClick = () => {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setPhone(user.phone);
        setIsEditing(true)
    }


    const handleSave = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");

            const response = await api.put("/profile", {
                firstName: firstName,
                lastName: lastName,
                phone: phone
            });

            if (response.data.status === "success"){
                setUser(response.data.user);
                setIsEditing(false)
            }
            else{
                setError("Failed to update profile");
            }

        }
        catch(error){
            console.log("error", error);
            setError("Something went wrong");
        }
    }


    const handleLogout = async () => {
        try{
            await api.post("/logout");
        }
        catch(error){
            console.log("error", error)
        }
        navigate("/login")
    }

    useEffect(() => {
        const fetchProfile = async () => {

        try{
            const response = await api.get("/profile", );

            if(response.data.status === "success"){
                setUser(response.data.user);
            }
            else{
                setError("failed to load profile")
            }
        }
        catch(error){
            console.log("error", error);
            setError("Invalid or token expired");
            navigate("/login");
        }
    }
        fetchProfile()
    }, [navigate]);

    return(
    <div className="page-wrapper">
        <div className="auth-card">
            <h1>Profile Page</h1>

            {error && <p className="error-text">{error}</p>}

            {user && (
                <div>
                    <div className="profile-field">
                        <span>Name</span>
                        {isEditing ? (
                            <span>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"/>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"/>
                            </span>
                        ):(
                            <span>{user.first_name} {user.last_name}</span>
                        )} 
                    </div>

                    <div className="profile-field">
                        <span>Email</span>
                        <span>{user.email}</span>
                    </div>

                    <div className="profile-field">
                        <span>Phone</span>
                        {isEditing ? (
                            <span>
                                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone"/>
                            </span>
                        ): (
                            <span>{user.phone}</span>
                        )}
                        
                    </div>

                    <div className="profile-field">
                        <span>Role</span>
                        <span>{user.role}</span>
                    </div>
                </div>
            )}

            {!isEditing && <button onClick={handleEditClick}>Edit</button>}

            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    </div>
)

}

export default Profile;