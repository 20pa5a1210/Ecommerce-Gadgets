import { createContext, useState, useEffect } from "react";

type UserContextType = {
  token: string | null;
  username: string | null;
  setUser: (username: string) => void;
  login: (token: string) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  token: null,
  username: null,
  setUser: (username: string) => {
    return username;
  },
  login: (token: string) => {
    return token;
  },
  logout: () => {
    return;
  },
});

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken || null;
  });
  const [username, setUsername] = useState<string | null>(() => {
    const storedUsername = localStorage.getItem("username");
    return storedUsername || null;
  });

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };
  const setUser = (newUsername: string) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUsername(null);
    localStorage.removeItem("username");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, username, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
