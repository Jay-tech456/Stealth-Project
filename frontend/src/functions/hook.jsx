import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(() => {
    const storedLogin = localStorage.getItem('login');
    return storedLogin ? JSON.parse(storedLogin) : false;
  });

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    localStorage.setItem('login', JSON.stringify(login));
  }, [login]);

  const val = {
    login,
    setLogin,
    user,
    setUser,
  }

  return (
    <AuthContext.Provider value={val}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
