import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, MenuItem } from '../types';

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  addItem: (item: MenuItem, restaurant: { id: string; name: string }) => boolean;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  addNote: (menuItemId: string, note: string) => void;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      restaurantName: null,

      addItem: (item: MenuItem, restaurant: { id: string; name: string }): boolean => {
        const state = get();

        // If items exist and restaurantId doesn't match, return false
        if (state.items.length > 0 && state.restaurantId !== restaurant.id) {
          return false;
        }

        const existingIndex = state.items.findIndex(
          (cartItem) => cartItem.menuItem.id === item.id
        );

        if (existingIndex !== -1) {
          // Item already in cart, increment quantity
          const updatedItems = [...state.items];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity + 1,
          };
          set({ items: updatedItems, restaurantId: restaurant.id, restaurantName: restaurant.name });
        } else {
          // Push new CartItem with quantity 1
          const newItem: CartItem = { id: Math.random().toString(), selectedOptions: [], note: '',
            menuItem: item,
            quantity: 1,
          };
          set({
            items: [...state.items, newItem],
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
          });
        }

        return true;
      },

      removeItem: (menuItemId: string) => {
        const state = get();
        const updatedItems = state.items.filter(
          (cartItem) => cartItem.menuItem.id !== menuItemId
        );
        if (updatedItems.length === 0) {
          set({ items: [], restaurantId: null, restaurantName: null });
        } else {
          set({ items: updatedItems });
        }
      },

      updateQuantity: (menuItemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }

        const state = get();
        const updatedItems = state.items.map((cartItem) =>
          cartItem.menuItem.id === menuItemId
            ? { ...cartItem, quantity }
            : cartItem
        );
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [], restaurantId: null, restaurantName: null });
      },

      addNote: (menuItemId: string, note: string) => {
        const state = get();
        const updatedItems = state.items.map((cartItem) =>
          cartItem.menuItem.id === menuItemId
            ? { ...cartItem, note }
            : cartItem
        );
        set({ items: updatedItems });
      },

      getSubtotal: (): number => {
        const state = get();
        return state.items.reduce((total, cartItem) => {
          const itemPrice = cartItem.menuItem.price;
          const optionsPrice = (cartItem.selectedOptions || []).reduce(
            (sum, opt) => sum + opt.price,
            0
          );
          return total + (itemPrice + optionsPrice) * cartItem.quantity;
        }, 0);
      },

      getDeliveryFee: (): number => {
        const state = get();
        if (state.items.length === 0) return 0;
        const subtotal = get().getSubtotal();
        return subtotal >= 150 ? 0 : subtotal >= 100 ? 5 : 10;
      },

      getTotal: (): number => {
        return get().getSubtotal() + get().getDeliveryFee();
      },

      getItemCount: (): number => {
        const state = get();
        return state.items.reduce((count, cartItem) => count + cartItem.quantity, 0);
      },
    }),
    {
      name: 'foodchain-cart',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        items: state.items,
        restaurantId: state.restaurantId,
        restaurantName: state.restaurantName,
      }),
    }
  )
);
