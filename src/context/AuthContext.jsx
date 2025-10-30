import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) {
      alert("Invalid username or password");
      return false;
    }
    localStorage.setItem("user", JSON.stringify(found));
    setUser(found);
    return true;
  };

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(u => u.username === username)) {
      alert("Username already exists");
      return false;
    }
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully");
    return login(username, password);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
