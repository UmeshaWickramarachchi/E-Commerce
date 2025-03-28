import { useState } from "react";
import API from "../api";
import { toast, ToastContainer } from "react-toastify"
import "./CSS/Login.css"
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("api/users/register", formData);
            toast.success(res.data.message); // Show success message
        } catch (error) {
            console.error(error); // Log the error for debugging
            toast.error(error.response?.data?.message || "Registration failed!");
        }
    };


    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="form">
                <span className="title">Register Form</span>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="input" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
                <button type="submit" className="button">Register</button>
                <span className="span1">Allready have an account? <Link to={'/login'} className="span2">Login</Link></span>
            </form>
        </>
    );
};

export default Register;
