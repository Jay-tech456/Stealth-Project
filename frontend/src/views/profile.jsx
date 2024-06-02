import { useState, useContext } from "react";
import AuthContext from "../functions/hook";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, login, setLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogin(false);
    localStorage.removeItem('login');
    navigate('/home'); 
  };

  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{textAlign: 'center'}}>
        <h1>Profile</h1>
        <p>{user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
