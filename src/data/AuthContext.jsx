import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const API_BASE = 'http://localhost:4000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('servixo_auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed.user);
        setToken(parsed.token);
      } catch {
        localStorage.removeItem('servixo_auth');
      }
    }
  }, []);

  const login = async ({ email, password, role }) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    if (!res.ok) {
      throw new Error('Invalid email or password');
    }
    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('servixo_auth', JSON.stringify(data));
  };

  const refreshMe = async () => {
    if (!token) return;
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const me = await res.json();
      setUser(me);
      localStorage.setItem('servixo_auth', JSON.stringify({ token, user: me }));
    }
  };

  const updateUser = (partial) => {
    setUser(prev => {
      const next = { ...(prev || {}), ...(partial || {}) };
      if (token) localStorage.setItem('servixo_auth', JSON.stringify({ token, user: next }));
      return next;
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('servixo_auth');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshMe, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

