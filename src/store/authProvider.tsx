import { User } from 'firebase/auth';
import React, { useContext, createContext, useState, useEffect } from 'react';
import { UserObj } from '../types/types';

const AuthContext = createContext({});

interface Props {
  children: JSX.Element;
}

function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const usr = sessionStorage.getItem('usr');
    const tkn = sessionStorage.getItem('tkn');
    const usrToObj = JSON.parse(usr as string);
    setUser(usrToObj);
    setToken(tkn);
  }, []);

  const login = (tkn: string, credentials: UserObj) => {
    sessionStorage.setItem('tkn', tkn);
    sessionStorage.setItem('usr', JSON.stringify(credentials));
    setToken(tkn);
    setUser(credentials);
  };

  const logout = () => {
    sessionStorage.removeItem('tkn');
    sessionStorage.removeItem('usr');
    setToken(null);
  };

  const ctx = { login, logout, isUserLoggedIn: !!token, user };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}

export function useAuthCtx(): any {
  return useContext(AuthContext);
}

export default AuthProvider;
