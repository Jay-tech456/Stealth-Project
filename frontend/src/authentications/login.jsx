import AuthContext from "../functions/hook";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import loginUser from "../functions/login";

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

  const handleSubmit = async () => {
    const user = await loginUser(email, password);
    if (user.status === "ok") {
      setUser(user.data);
      localStorage.setItem("user", JSON.stringify(user.data));
      setLogin(true);
      navigate('/profile');
    } else {
      alert("Invalid Credentials");
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
