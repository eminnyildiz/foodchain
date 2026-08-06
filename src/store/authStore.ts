import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  setUser: (user: User | null) => void;
}

const generateId = (): string => Math.random().toString(36).substring(2, 10);

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string): Promise<boolean> => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === 'customer@test.com' && password === '123456') {
      const user: User = {
        id: 'user_customer_01',
        email: 'customer@test.com',
        name: 'Ahmet',
        surname: 'Yıldız',
        phone: '0555 123 4567',
        role: 'customer',
        addresses: [
          {
            id: 'addr_1',
            title: 'Ev',
            address: 'Kadıköy, İstanbul, Türkiye',
            latitude: 40.9819,
            longitude: 29.0573,
            isDefault: true,
          },
          {
            id: 'addr_2',
            title: 'İş',
            address: 'Levent, İstanbul, Türkiye',
            latitude: 41.0819,
            longitude: 29.0173,
            isDefault: false,
          },
        ],
        createdAt: '2025-01-15T10:30:00.000Z',
      };
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    }

    if (email === 'restaurant@test.com' && password === '123456') {
      const user: User = {
        id: 'user_restaurant_01',
        email: 'restaurant@test.com',
        name: 'Mehmet',
        surname: 'Demir',
        phone: '0555 987 6543',
        role: 'restaurant',
        addresses: [
          {
            id: 'addr_3',
            title: 'Restoran',
            address: 'Beşiktaş, İstanbul, Türkiye',
            latitude: 41.0422,
            longitude: 29.0069,
            isDefault: true,
          },
        ],
        createdAt: '2024-11-20T08:00:00.000Z',
      };
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    }

    // Any other email/password combo -> create new customer user
    const nameFromEmail = email.split('@')[0];
    const user: User = {
      id: generateId(),
      email,
      name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
      surname: '',
      phone: '',
      role: 'customer',
      addresses: [
        {
          id: generateId(),
          title: 'Ev',
          address: 'İstanbul, Türkiye',
          latitude: 41.0082,
          longitude: 28.9784,
          isDefault: true,
        },
      ],
      createdAt: new Date().toISOString(),
    };
    set({ user, isAuthenticated: true, isLoading: false });
    return true;
  },

  register: async (data): Promise<boolean> => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user: User = {
      id: generateId(),
      email: data.email,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      role: 'customer',
      addresses: [
        {
          id: generateId(),
          title: 'Ev',
          address: 'İstanbul, Türkiye',
          latitude: 41.0082,
          longitude: 28.9784,
          isDefault: true,
        },
      ],
      createdAt: new Date().toISOString(),
    };

    set({ user, isAuthenticated: true, isLoading: false });
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  updateProfile: (data: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
}));
