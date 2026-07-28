// FoodChain App Configuration

export const APP_CONFIG = {
  name: 'FoodChain',
  version: '1.0.0',
  buildNumber: '1',
  bundleId: 'com.foodchain.app',
  supportEmail: 'support@foodchain.com',
} as const;

export const FIREBASE_CONFIG = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
  databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
} as const;

export const ADMOB_CONFIG = {
  android: {
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    rewarded: 'ca-app-pub-3940256099942544/5224354917',
    native: 'ca-app-pub-3940256099942544/2247696110',
    appOpen: 'ca-app-pub-3940256099942544/9257395921',
  },
  ios: {
    banner: 'ca-app-pub-3940256099942544/2934735716',
    interstitial: 'ca-app-pub-3940256099942544/4411468910',
    rewarded: 'ca-app-pub-3940256099942544/1712485313',
    native: 'ca-app-pub-3940256099942544/3986624511',
    appOpen: 'ca-app-pub-3940256099942544/5575463023',
  },
} as const;

export const DEFAULT_LOCATION = {
  latitude: 41.0082,
  longitude: 28.9784,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
  city: 'İstanbul',
  country: 'Türkiye',
} as const;

export const MAP_CONFIG = {
  defaultZoom: 14,
  searchRadius: 5000,
  maxSearchRadius: 20000,
  clusterRadius: 50,
} as const;

export const ORDER_CONFIG = {
  minOrderAmount: 50,
  defaultDeliveryFee: 15,
  freeDeliveryThreshold: 150,
  estimatedDeliveryTimeMin: 20,
  estimatedDeliveryTimeMax: 45,
  maxOrderNote: 200,
} as const;

export const PAGINATION = {
  defaultPageSize: 10,
  restaurantPageSize: 10,
  orderPageSize: 15,
  reviewPageSize: 10,
} as const;

export const CACHE_CONFIG = {
  restaurantCacheDuration: 5 * 60 * 1000,
  menuCacheDuration: 10 * 60 * 1000,
  categoryCacheDuration: 30 * 60 * 1000,
  profileCacheDuration: 15 * 60 * 1000,
} as const;

export const VALIDATION = {
  minPasswordLength: 6,
  maxPasswordLength: 50,
  minNameLength: 2,
  maxNameLength: 50,
  phoneRegex: /^(\+90|0)?[0-9]{10}$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export const IMAGE_CONFIG = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.8,
  thumbnailSize: 200,
  avatarSize: 400,
  menuItemImageSize: 800,
  restaurantCoverSize: 1200,
} as const;
