import AuthContext from "../functions/hook";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setToggleSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLogin, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    // Simulate an API call to log in the user
    if (email === "user@example.com" && password === "password") {
      const userdata = { email: email };
      setUser(userdata);
      setLogin(true); // Set the login state to true
      navigate('/profile'); 
    } else {
      console.log("Invalid credentials");
    }

  };

  return (
    <div className="login">
      <div>
        <h3 style={{ textAlign: 'center' }}>Login</h3>
        <input
          type="text"
          id="login"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        <br />
        <div>
          <p>No Account?</p>
          <button onClick={() => setToggleSwitch('signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
