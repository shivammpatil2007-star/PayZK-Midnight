import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'Employee (Prover)' | 'Verifier (Institution)' | 'Employer (Issuer)' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  activeRole: Role;
  showAuthModal: boolean;
  login: (role?: Role) => void;
  logout: () => void;
  setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeRole, setActiveRole] = useState<Role>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check localStorage for existing session
    const savedRole = localStorage.getItem('payzk_activeRole') as Role;
    if (savedRole) {
      setIsAuthenticated(true);
      setActiveRole(savedRole);
    }
  }, []);

  const login = (role?: Role) => {
    setIsAuthenticated(true);
    if (role) {
      setActiveRole(role);
      localStorage.setItem('payzk_activeRole', role);
    }
    setShowAuthModal(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveRole(null);
    localStorage.removeItem('payzk_activeRole');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, activeRole, showAuthModal, login, logout, setShowAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
