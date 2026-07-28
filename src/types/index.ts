// FoodChain TypeScript Type Definitions

export type UserRole = 'customer' | 'restaurant';

export interface Address {
  id: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  addresses: Address[];
  createdAt: string;
}

export interface WorkingHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  deliveryTime: number;
  deliveryFee: number;
  minOrder: number;
  categories: string[];
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  workingHours: WorkingHours[];
  isOpen: boolean;
  ownerId: string;
}

export interface Category {
  id: string;
  name: string;
  nameKey: string;
  icon: string;
  image?: string;
}

export interface MenuItemOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  isAvailable: boolean;
  options?: MenuItemOption[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOptions?: MenuItemOption[];
  note?: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'onTheWay'
  | 'delivered'
  | 'cancelled';

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage?: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryAddress: Address;
  paymentInfo: PaymentInfo;
  note?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  restaurantId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
