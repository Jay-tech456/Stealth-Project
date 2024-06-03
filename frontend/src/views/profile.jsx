import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../functions/hook";
function Profile() {
  const { user, login, setLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogin(false);
    localStorage.removeItem('login');
    localStorage.removeItem('user');
    navigate('/home'); 
  };
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{textAlign: 'center'}}>
        <h1>Profile</h1>
        <p> Email: {user?.user?.Email}</p>
        <p>First Name: {user?.user["First Name"]}</p>
        <p>Last Name: {user?.user["Last Name"]}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
