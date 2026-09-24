import './App.css';
import { Routes, Route } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";



function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    
  );
}

export default App;
