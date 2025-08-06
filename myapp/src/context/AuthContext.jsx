import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn: !!user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
