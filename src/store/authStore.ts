import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSSRSafeStorage } from './ssrStorage';
import { User, Address } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  _hasHydrated: boolean;
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
  addAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  updateAddress: (addressId: string, data: Address) => void;
  setDefaultAddress: (addressId: string) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

const generateId = (): string => Math.random().toString(36).substring(2, 10);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      _hasHydrated: false,

      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email === 'customer@test.com' && password === '123456') {
          const user: User = {
            id: 'user_customer_01',
            email: 'customer@test.com',
            firstName: 'Ahmet',
            lastName: 'Yıldız',
            phone: '0555 123 4567',
            role: 'customer',
            addresses: [
              {
                id: 'addr_1',
                title: 'Ev',
                street: 'Kadıköy, İstanbul, Türkiye', city: 'Istanbul', district: 'Kadikoy', postalCode: '34000',
                coordinates: { lat: 40.9819, lng: 29.0573 },
                isDefault: true,
              },
              {
                id: 'addr_2',
                title: 'İş',
                street: 'Levent, İstanbul, Türkiye', city: 'Istanbul', district: 'Kadikoy', postalCode: '34000',
                coordinates: { lat: 41.0819, lng: 29.0173 },
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
            firstName: 'Mehmet',
            lastName: 'Demir',
            phone: '0555 987 6543',
            role: 'restaurant',
            addresses: [
              {
                id: 'addr_3',
                title: 'Restoran',
                street: 'Beşiktaş, İstanbul, Türkiye', city: 'Istanbul', district: 'Kadikoy', postalCode: '34000',
                coordinates: { lat: 41.0422, lng: 29.0069 },
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
          firstName: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
          lastName: '',
          phone: '',
          role: 'customer',
          addresses: [
            {
              id: generateId(),
              title: 'Ev',
              street: 'İstanbul, Türkiye', city: 'Istanbul', district: 'Kadikoy', postalCode: '34000',
              coordinates: { lat: 41.0082, lng: 28.9784 },
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
          firstName: data.name,
          lastName: data.surname,
          phone: data.phone,
          role: 'customer',
          addresses: [
            {
              id: generateId(),
              title: 'Ev',
              street: 'İstanbul, Türkiye', city: 'Istanbul', district: 'Kadikoy', postalCode: '34000',
              coordinates: { lat: 41.0082, lng: 28.9784 },
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

      addAddress: (address: Address) => {
        set((state) => {
          if (!state.user) return state;
          const addresses = [...state.user.addresses, address];
          // If this is the first address or marked default, ensure only one default
          if (address.isDefault || addresses.length === 1) {
            return {
              user: {
                ...state.user,
                addresses: addresses.map((a) => ({
                  ...a,
                  isDefault: a.id === address.id,
                })),
              },
            };
          }
          return { user: { ...state.user, addresses } };
        });
      },

      removeAddress: (addressId: string) => {
        set((state) => {
          if (!state.user) return state;
          const filtered = state.user.addresses.filter((a) => a.id !== addressId);
          // If we removed the default and there are remaining, promote the first
          if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
            filtered[0].isDefault = true;
          }
          return { user: { ...state.user, addresses: filtered } };
        });
      },

      updateAddress: (addressId: string, data: Address) => {
        set((state) => {
          if (!state.user) return state;
          let addresses = state.user.addresses.map((a) =>
            a.id === addressId ? { ...data, id: addressId } : a,
          );
          // If updated address is now default, unset others
          if (data.isDefault) {
            addresses = addresses.map((a) => ({
              ...a,
              isDefault: a.id === addressId,
            }));
          }
          return { user: { ...state.user, addresses } };
        });
      },

      setDefaultAddress: (addressId: string) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.map((a) => ({
                ...a,
                isDefault: a.id === addressId,
              })),
            },
          };
        });
      },

      changePassword: async (_currentPassword: string, _newPassword: string): Promise<boolean> => {
        // Simulated password change — in production this calls an API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Demo: always succeeds
        return true;
      },
    }),
    {
      name: 'foodchain-auth',
      storage: createSSRSafeStorage(),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => {
        return () => {
          useAuthStore.setState({ _hasHydrated: true });
        };
      },
    }
  )
);
