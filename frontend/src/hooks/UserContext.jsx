import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initially true

  const authCheck = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users/me", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false); // done loading whether success or not
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  const login = useCallback(
    async (formData) => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/users/login",
          formData,
          { withCredentials: true }
        );
        toast.success(res.data.message);
        setUser(res.data.user);
        navigate("/dashboard");
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    },
    [navigate]
  );

  const handleLogout = useCallback(async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message);
      toast.error("Logout failed");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, login, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
