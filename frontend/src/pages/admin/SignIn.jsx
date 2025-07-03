import React, { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Toaster position="top-center" />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border border-slate-300 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-sm"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="w-full border border-slate-300 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-sm"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <span
          className="absolute right-2 top-2 cursor-pointer text-sm text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
      <button className="bg-blue-600 cursor-pointer text-white p-2 rounded-md hover:bg-blue-700 transition">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
