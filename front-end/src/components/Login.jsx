import React, { useEffect, useState } from "react";
import eye from "../assets/eye-solid.png";
import eyeSlash from "../assets/eye-slash-solid.png";
import { useNavigate } from "react-router-dom";
function Login() {
  // hide/unhide
  const [hide, setHide] = useState(true);
  const [passLogo, setPassLogo] = useState(eyeSlash);
  //fields data
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      Navigate("/");
    }
  });

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };
  const handleUserPass = (e) => {
    setUserPass(e.target.value);
  };

  const toggleHide = () => {
    setHide(!hide);
    if (passLogo === eye) {
      setPassLogo(eyeSlash);
    } else {
      setPassLogo(eye);
    }
    // console.log(passLogo);
  };

  //! data send to nodejs
  const collectData = async () => {
    console.log(userEmail + " " + userPass);
    const response = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({
        email: userEmail,
        password: userPass,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.token));
      Navigate("/");
    } else {
      alert(`invalid credential ${result.result}`);
    }
  };
  return (
    <div className="container">
      <div className="form">
        <h1>Login</h1>

        <input
          className="input-field"
          type="email"
          placeholder="Enter email"
          value={userEmail}
          onChange={handleUserEmail}
        />
        <div className="pass-container">
          <input
            className="pass-input-field"
            type={hide ? "password" : "text"}
            placeholder="Enter password"
            value={userPass}
            onChange={handleUserPass}
          />
          <button className="hide" onClick={toggleHide}>
            <img className="pass-logo" src={passLogo} alt="hidden" />
          </button>
        </div>
        <button className="submit" onClick={collectData}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
