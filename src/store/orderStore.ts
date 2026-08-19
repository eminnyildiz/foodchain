import { create } from 'zustand';
import { Order, OrderStatus, CartItem, Address, PaymentInfo } from '../types';

interface CreateOrderParams {
  userId: string;
  restaurantId: string;


  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: Address;
  paymentInfo: PaymentInfo;
  note?: string;
  estimatedDeliveryTime?: string;
}

interface OrderState {
  orders: Order[];
  createOrder: (params: CreateOrderParams) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getActiveOrders: () => Order[];
  getPastOrders: () => Order[];
}

const generateId = (): string => 's' + Math.random().toString().substring(2, 6);

const TERMINAL_STATUSES: OrderStatus[] = ['delivered', 'cancelled'];

const simulateOrderProgress = (orderId: string, get: () => OrderState) => {
  const safeUpdate = (status: OrderStatus) => {
    const order = get().orders.find((o) => o.id === orderId);
    if (order && !TERMINAL_STATUSES.includes(order.status)) {
      get().updateOrderStatus(orderId, status);
    }
  };

  setTimeout(() => safeUpdate('confirmed'), 10000);
  setTimeout(() => safeUpdate('preparing'), 30000);
  setTimeout(() => safeUpdate('onTheWay'), 60000);
  setTimeout(() => safeUpdate('delivered'), 120000);
};

const demoAddress: Address = {
  id: 'addr_1',
  title: 'Ev',
  street: 'Kadıköy, İstanbul, Türkiye', city: 'Istanbul', district: 'Kadikoy', postalCode: '34000',
  coordinates: { lat: 40.9819, lng: 29.0573 },
  isDefault: true,
};

const demoPaymentInfo: PaymentInfo = {
  method: 'credit_card', last4: '1234',
};

const demoOrders: Order[] = [
  {
    id: 'order_001',
    userId: 'user_customer_01',
    restaurantId: 'r1',
            items: [
      {
        id: 'cart-item-1',
        menuItem: {
          id: 'm1',
          restaurantId: 'r1',
          name: 'Adana Kebap',
          description: 'Özel baharatlarla hazırlanmış el yapımı Adana kebap',
          price: 185,
          categoryId: 'Kebaplar',
          isAvailable: true,
        },
        quantity: 2,
      },
      {
        id: 'cart-item-1',
        menuItem: {
          id: 'm2',
          restaurantId: 'r1',
          name: 'Ayran',
          description: 'Taze yayık ayran',
          price: 20,
          categoryId: 'İçecekler',
          isAvailable: true,
        },
        quantity: 2,
      },
    ],
    status: 'delivered',
    subtotal: 410,
    deliveryFee: 0,
    total: 410,
    deliveryAddress: demoAddress,
    paymentInfo: demoPaymentInfo,
    createdAt: '2026-07-10T12:30:00.000Z',
        estimatedDeliveryTime: '35 min',
  },
  {
    id: 'order_002',
    userId: 'user_customer_01',
    restaurantId: 'r2',
            items: [
      {
        id: 'cart-item-1',
        menuItem: {
          id: 'm3',
          restaurantId: 'r2',
          name: 'Margherita Pizza',
          description: 'Domates sosu, mozzarella ve fesleğen',
          price: 140,
          categoryId: 'Pizzalar',
          isAvailable: true,
        },
        quantity: 1,
      },
      {
        id: 'cart-item-1',
        menuItem: {
          id: 'm4',
          restaurantId: 'r2',
          name: 'Tiramisu',
          description: 'Ev yapımı İtalyan tiramisu',
          price: 75,
          categoryId: 'Tatlılar',
          isAvailable: true,
        },
        quantity: 1,
      },
    ],
    status: 'cancelled',
    subtotal: 215,
    deliveryFee: 0,
    total: 215,
    deliveryAddress: demoAddress,
    paymentInfo: demoPaymentInfo,
    createdAt: '2026-07-09T18:45:00.000Z',
        estimatedDeliveryTime: '35 min',
  },
  {
    id: 'order_003',
    userId: 'user_customer_01',
    restaurantId: 'r3',
            items: [
      {
        id: 'cart-item-1',
        menuItem: {
          id: 'm5',
          restaurantId: 'r3',
          name: 'Salmon Nigiri Set',
          description: '8 parça taze somon nigiri',
          price: 220,
          categoryId: 'Sushi',
          isAvailable: true,
        },
        quantity: 1,
      },
      {
        id: 'cart-item-1',
        menuItem: {
          id: 'm6',
          restaurantId: 'r3',
          name: 'Miso Çorbası',
          description: 'Geleneksel Japon miso çorbası',
          price: 45,
          categoryId: 'Çorbalar',
          isAvailable: true,
        },
        quantity: 2,
      },
    ],
    status: 'preparing',
    subtotal: 310,
    deliveryFee: 0,
    total: 310,
    deliveryAddress: demoAddress,
    paymentInfo: demoPaymentInfo,
    createdAt: '2026-07-14T14:00:00.000Z',
        estimatedDeliveryTime: '35 min',
  },
  {
    id: 'order_004',
    userId: 'user_customer_01',
    restaurantId: 'r4',
            items: [
      {
        id: 'cart-item-1',
        menuItem: {
          id: 'm7',
          restaurantId: 'r4',
          name: 'Classic Cheeseburger',
          description: 'Dana eti, cheddar, marul, domates ve özel sos',
          price: 135,
          categoryId: 'Burgerler',
          isAvailable: true,
        },
        quantity: 2,
      },
      {
        id: 'cart-item-1',
        menuItem: {
          id: 'm8',
          restaurantId: 'r4',
          name: 'Patates Kızartması',
          description: 'Çıtır patates kızartması',
          price: 45,
          categoryId: 'Yan Ürünler',
          isAvailable: true,
        },
        quantity: 1,
      },
    ],
    status: 'pending',
    subtotal: 315,
    deliveryFee: 0,
    total: 315,
    deliveryAddress: demoAddress,
    paymentInfo: demoPaymentInfo,
    createdAt: '2026-07-14T17:00:00.000Z',
        estimatedDeliveryTime: '35 min',
  },
  {
    id: 'order_005',
    userId: 'user_customer_01',
    restaurantId: 'r5',
            items: [
      {
        id: 'cart-item-1',
        menuItem: {
          id: 'm9',
          restaurantId: 'r5',
          name: 'Çiğ Köfte Dürüm',
          description: 'Nar ekşili, yeşillikli çiğ köfte dürüm',
          price: 65,
          categoryId: 'Dürümler',
          isAvailable: true,
        },
        quantity: 3,
      },
      {
        id: 'cart-item-1',
        menuItem: {
          id: 'm10',
          restaurantId: 'r5',
          name: 'Şalgam',
          description: 'Acılı şalgam suyu',
          price: 15,
          categoryId: 'İçecekler',
          isAvailable: true,
        },
        quantity: 3,
      },
    ],
    status: 'confirmed',
    subtotal: 240,
    deliveryFee: 0,
    total: 240,
    deliveryAddress: demoAddress,
    paymentInfo: demoPaymentInfo,
    createdAt: '2026-07-14T16:30:00.000Z',
        estimatedDeliveryTime: '35 min',
  },
];

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: demoOrders,

  createOrder: (params: CreateOrderParams): Order => {
    const now = new Date().toISOString();
    const order: Order = {
      id: generateId(),
      userId: params.userId,
      restaurantId: params.restaurantId,
      
      
      items: params.items,
      status: 'pending',
      subtotal: params.subtotal,
      deliveryFee: params.deliveryFee,
      total: params.total,
      deliveryAddress: params.deliveryAddress,
      paymentInfo: params.paymentInfo,
      
      createdAt: now,
      
      estimatedDeliveryTime: '35 min',
    };

    set((state) => ({ orders: [order, ...state.orders] }));
    simulateOrderProgress(order.id, get);

    return order;
  },

  updateOrderStatus: (orderId: string, status: OrderStatus) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      ),
    }));
  },

  getActiveOrders: (): Order[] => {
    const activeStatuses: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'onTheWay'];
    return get().orders.filter((order) => activeStatuses.includes(order.status));
  },

  getPastOrders: (): Order[] => {
    const pastStatuses: OrderStatus[] = ['delivered', 'cancelled'];
    return get().orders.filter((order) => pastStatuses.includes(order.status));
  },
}));
