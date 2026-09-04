import { createJSONStorage, type StateStorage } from 'zustand/middleware';

/**
 * A no-op storage implementation used during SSR (server-side rendering)
 * when window/localStorage are not available.
 */
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

/**
 * Creates a Zustand-compatible JSON storage that is safe for SSR.
 * During static web export (Node.js environment), it returns a no-op storage
 * to prevent "window is not defined" errors from AsyncStorage/localStorage.
 * At runtime in the browser or on native, it uses AsyncStorage normally.
 */
export const createSSRSafeStorage = () => {
  if (typeof window === 'undefined') {
    return createJSONStorage(() => noopStorage);
  }

  // Lazy-import AsyncStorage only in client/native context
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  return createJSONStorage(() => AsyncStorage);
};
