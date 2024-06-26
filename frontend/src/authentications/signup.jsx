import React, { useState, useContext } from "react";
import signupUser from "../functions/signup";
import AuthContext from "../functions/hook";
import { useNavigate } from "react-router-dom";

function SignUp({ setToggleSwitch }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setLogin, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () =>{
    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }
    if(!firstName || !lastName || !email || !password || !confirmPassword){
      alert("Please fill all the fields");
      return;
    }
    else{
        const data = await signupUser(email, password, firstName, lastName);
        console.log(data);
        if (data.status === "ok"){
           setUser(data.data);
           localStorage.setItem("user", JSON.stringify(data.data));
           setLogin(true);
           navigate('/profile');
        }
        else{
          console.log("Sign Up error");
          alert("Unale to sign up at the moment");
        }
    }
  };

  return (
    <div className="login">
      <div>
        <h3>SignUp</h3>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button onClick={handleSubmit}>SignUp</button>
        <div>
          <p>Already a member?</p>
          <button onClick={() => setToggleSwitch('signin')}>Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
