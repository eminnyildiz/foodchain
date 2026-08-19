// FoodChain TypeScript Type Definitions

export type UserRole = 'customer' | 'restaurant' | 'admin';

export interface Address {
  id: string;
  title: string;
  street: string;
  city: string;
  district: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  addresses: Address[];
  createdAt: string;
}

export interface WorkingHours {
  open: string;
  close: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrderAmount: number;
  categories: string[];
  workingHours: WorkingHours;
  isOpen: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface MenuItemOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  options?: MenuItemOption[];
}

export interface CartItem {
  id: string;
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
  method: 'credit_card' | 'cash_on_delivery';
  last4: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: Address;
  paymentInfo: PaymentInfo;
  createdAt: string;
  estimatedDeliveryTime: string;
}

export interface Review {
  id: string;
  orderId: string;
  userId: string;
  restaurantId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
