// import React, { useState } from "react";
// import "./styles.css";
// import { useNavigate } from "react-router-dom";
// import { FormLabel, Input, Button } from "@chakra-ui/react";
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate();
//   const [errorMessages, setErrorMessages] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const { uname, pass } = event.target.elements;

//     // Reset previous error messages
//     setErrorMessages({});

//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         uname: uname.value,
//         pass: pass.value,
//       });

//       if (response.data.data) {
//         console.log("Successful Response:", response.data.data);
//         setIsSubmitted(true);
//         localStorage.setItem("username", response.data.data.username);
//         localStorage.setItem("userID", response.data.data._id);
//         navigate("/admin/dashboard");
//       } else {
//         console.log("error");
//         setErrorMessages({ name: "error", message: response.data.error });
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   const renderErrorMessage = () =>
//     errorMessages.name && <div className="error">{errorMessages.message}</div>;

//   const renderForm = (
//     <div className="form">
//       <form onSubmit={handleSubmit}>
//         <div
//           className={`input-container ${
//             errorMessages.name ? "error-input" : ""
//           }`}
//         >
//           <FormLabel>Username </FormLabel>
//           <Input type="text" name="uname" required />
//         </div>
//         <div
//           className={`input-container ${
//             errorMessages.name ? "error-input" : ""
//           }`}
//         >
//           <FormLabel>Password </FormLabel>
//           <Input type="password" name="pass" required />
//         </div>
//         {renderErrorMessage()}
//         <div className="button-container">
//           <Button type="submit">Submit</Button>
//         </div>
//       </form>
//     </div>
//   );

//   return (
//     <div className="app container">
//       <div className="login-form">
//         <div className="title">Sign In</div>
//         {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import Image1 from "../../../src/Common/sidebar/img/logo.png";
import { mongopath } from "../component/Mongopath/Mongopath";
const Login = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // console.log(errorMessages)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { uname, pass } = event.target.elements;

    // Reset previous error messages
    setErrorMessages({});

    try {
      const response = await axios.post(`${mongopath}login`, {
        // const response = await axios.post("https://peaceful-yonath.66-179-255-123.plesk.page/api/login", {
        uname: uname.value,
        pass: pass.value,
      });

      if (response.data.data) {
        console.log("Successful Response:", response.data.data);
        setIsSubmitted(true);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("userID", response.data.data._id);      
          localStorage.setItem("lastlogin", response.data.lastlogin);

        navigate("/admin/dashboard");
      } else {
        console.log("Error Response:", response.data.error);
        setErrorMessages({ name: "error", message: response.data.error });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // const renderErrorMessage = () => {
  //   console.log("Rendering error message:", errorMessages);
  //   return errorMessages.name && <div className="error">{errorMessages.message}</div>;
  // };

  const renderErrorMessage = () =>
    console.log("Rendering error message:", errorMessages);
  errorMessages.name && <div className="error">{errorMessages.message}</div>;

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <FormLabel>Username </FormLabel>
          <Input
            type="text"
            name="uname"
            required
          />
        </div>
        <div className="input-container">
          <FormLabel>Password </FormLabel>
          <Input
            type="password"
            name="pass"
            required
          />
        </div>
        {renderErrorMessage()}
        <div className="button-container">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app container for-login">
      <div className="login-form">
        <div id="logonew">
          <a>
            <img src={Image1} alt="" />
          </a>
        </div>
        <h1 class="log_in">Welcome to CMSEzee Admin.</h1>
	      <h5>Please sign in to get access.</h5>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        <a href="/#" class="lost">&nbsp; Lost Your Password ?</a>
      </div>
    </div>
  );
};

export default Login;
