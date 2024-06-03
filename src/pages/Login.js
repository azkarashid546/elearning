import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Facebook from "../images/facebook-f-logo.png";
import Google from "../images/Google-G-Logo.png";
import Twitter from "../images/twitter-x-logo.png";
import Github from "../images/GitHub-Symbol.png"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../redux/features/auth/authApi";
import {signIn} from "next-auth/react"
import { userAgent } from "next/server";
import { useSelector } from "react-redux";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.auth.user);
  let navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/auth/login-user",
  //       {
  //         email: credentials.email,
  //         password: credentials.password,
  //         withCredentials: true,
  //       }
  //     );

  //     const json = response.data;

  //     console.log(json);

  //     if (json.success) {
  //       // Save the auth-token and redirect
  //       localStorage.setItem("token", json.accessToken);
  //       toast.success("Successfully logged in!");
  //       navigate("/"); // Assuming navigate is provided by React Router
  //     } else {
  //       toast.error("Invalid Details");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error(error?.response?.data?.message)

  //   }
  // };
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
  });

  
  const [login, {isSuccess, error}]= useLoginMutation()
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
       await login({email, password})
    
    },
  });


  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "instructor") {
        navigate("/instructor");
      } else {
        navigate("/profile");
      }
    }
  
  }, [isSuccess, error])

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const onChange = (e) => {
  //   setCredentials({ ...credentials, [e.target.name]: e.target.value });
  // };
  return (
    <>
      <div className="login-form">
        <div className="login-form-center">
          <Toaster />
          <form onSubmit={handleSubmit}>
            <h1 className="text-white text-center p-3">Login With ELearning</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email && touched.email ? 'border-danger' : ''}`}
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                style = {{outline : "none"}}
              />
               {errors.email && touched.email && (
                <span className="pt-2 block" style={{color : "red"}}>
                  {errors.email}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">
                Password
              </label>
              <div className="d-flex password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${errors.password && touched.password ? 'border-danger-2' : ''}`}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  style = {{outline : "none"}}
                />
                {showPassword ? (
                  <i
                    class="fa-solid fa-eye fa-xl p-2"
                    onClick={togglePasswordVisibility}
                  ></i>
                ) : (
                  <i
                    class="fa-solid fa-eye-slash fa-xl p-2"
                    onClick={togglePasswordVisibility}
                  ></i>
                )}
             
              </div>
              {errors.password && touched.password && (
                <span className="pt-2 block" style={{color : "red"}}>
                  {errors.password}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ borderRadius: "50px" }}
            >
              Login
            </button>
            <div className="social-accounts">
              <span className="text-white mt-5 mb-3 text-center">
                or join with
              </span>
              <div>
                <div className="social-images">
                  <div className="social-img">
                    <img src={Github} alt="" onClick={() => signIn("github")}/>
                  </div>
                  <div className="social-img">
                    <img src={Google} alt="" onClick={() => signIn("google")}/>
                  </div>
                  <div className="social-img">
                    <img src={Twitter} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white my-5 text-center">
              Not have any account? <Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;