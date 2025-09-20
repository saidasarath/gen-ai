import { useState, useEffect } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log('Loaded user from localStorage:', userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Default login credentials
    const DEFAULT_EMAIL = 'admin@interview.com';
    const DEFAULT_PASSWORD = 'password123';
    
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials
      if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
        const defaultUser: User = {
          id: '1',
          email: DEFAULT_EMAIL,
          name: 'Admin User',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${DEFAULT_EMAIL}`,
        };
        
        // Set user and localStorage
        setUser(defaultUser);
        localStorage.setItem('user', JSON.stringify(defaultUser));
        console.log('Login successful, user set:', defaultUser);
        
        // Force a small delay to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return true;
      } else {
        console.log('Login failed - invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Registration disabled - only default user allowed
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Always return false for signup attempts
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };
};