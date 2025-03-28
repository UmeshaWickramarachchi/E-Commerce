import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext"
import { toast, ToastContainer } from "react-toastify";
import "./CSS/Login.css"
import { Link } from "react-router-dom";

export const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);

      // Access message from the response directly
      toast.success("Login Successfull"); // Show success message
    } catch (error) {

      // Access error message from the response (in case of failure)
      toast.error("Login failed!");
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="form">
        <span className="title">Login Form</span>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
        <button type="submit" className="button">Login</button>
        <span className="span1">Don't have an account? <Link to={'/register'} className="span2">Register</Link></span>
      </form>
    </>
  );
};