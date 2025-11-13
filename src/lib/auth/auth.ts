import { User } from '../types';

const USERS_KEY = 'nutripro_users';
const CURRENT_USER_KEY = 'nutripro_current_user';

export const authService = {
  register: (email: string, password: string, name: string): User | null => {
    if (typeof window === 'undefined') return null;
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Verifica se email já existe
    if (users.find((u: any) => u.email === email)) {
      throw new Error('Email já cadastrado');
    }
    
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };
    
    // Salva senha (em produção, usar hash)
    const userWithPassword = { ...newUser, password };
    users.push(userWithPassword);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return newUser;
  },

  login: (email: string, password: string): User | null => {
    if (typeof window === 'undefined') return null;
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Email ou senha incorretos');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  },

  logout: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    return authService.getCurrentUser() !== null;
  },
};
