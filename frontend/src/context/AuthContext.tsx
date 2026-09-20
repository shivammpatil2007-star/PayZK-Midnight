import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'Employee' | 'Verifier' | 'Issuer';

export interface User {
  id: string;
  name: string;
  role: Role;
  walletAddress: string;
  avatarSeed: string;
  sessionTimestamp: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (role: Role) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedSession = localStorage.getItem('payzk_auth_session');
    if (savedSession) {
      try {
        setCurrentUser(JSON.parse(savedSession));
      } catch (e) {
        console.error('Failed to parse auth session');
      }
    }
  }, []);

  const login = (role: Role) => {
    const newUser: User = {
      id: `USR-${Math.floor(Math.random() * 10000)}`,
      name: role === 'Employee' ? 'Alice Worker' : role === 'Verifier' ? 'Global Bank Ltd' : 'TechCorp Inc',
      role,
      walletAddress: 'mn_addr_preview1' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      avatarSeed: Math.random().toString(36).substring(7),
      sessionTimestamp: new Date().toISOString()
    };
    setCurrentUser(newUser);
    localStorage.setItem('payzk_auth_session', JSON.stringify(newUser));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('payzk_auth_session');
  };

  const switchRole = (role: Role) => {
    if (currentUser) {
      const updated = { ...currentUser, role };
      setCurrentUser(updated);
      localStorage.setItem('payzk_auth_session', JSON.stringify(updated));
    } else {
      login(role);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!currentUser, currentUser, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
