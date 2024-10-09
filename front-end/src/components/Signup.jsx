import React, { useEffect, useState } from "react";
import eye from "../assets/eye-solid.png";
import eyeSlash from "../assets/eye-slash-solid.png";
import { useNavigate } from "react-router-dom";
function Signup() {
  // hide/unhide
  const [hide, setHide] = useState(true);
  const [passLogo, setPassLogo] = useState(eyeSlash);
  //fields data
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const Navigate = useNavigate();

  // const [userdata, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   pass: "",
  // });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      Navigate("/");
    }
  }, []);
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };
  const handleUserPass = (e) => {
    setUserPass(e.target.value);
  };

  // const handleSubmit = () => {
  //   setUserData({
  //     name: userName,
  //     email: userEmail,
  //     pass: userPass,
  //   });
  // };

  // useEffect(() => {
  //   console.log(userdata);
  // }, [userdata]);

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
    console.log(userName + " " + userEmail + " " + userPass);
    const response = await fetch("http://localhost:5000/register", {
      method: "post", // react makes a post request
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPass,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    if (result) {
      Navigate("/");
    }
  };
  return (
    <div className="container">
      <div className="form">
        <h1>Register Yourself</h1>
        <input
          className="input-field"
          type="text"
          placeholder="Enter username"
          value={userName}
          onChange={handleUserName}
        />
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

export default Signup;
