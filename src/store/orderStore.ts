import { create } from 'zustand';
import { Order, OrderStatus, CartItem, Address, PaymentInfo } from '../types';

interface CreateOrderParams {
  customerId: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryAddress: Address;
  paymentInfo: PaymentInfo;
  note?: string;
  estimatedDeliveryTime?: number;
}

interface OrderState {
  orders: Order[];
  createOrder: (params: CreateOrderParams) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getActiveOrders: () => Order[];
  getPastOrders: () => Order[];
}

const generateId = (): string => 's' + Math.random().toString().substring(2, 6);

const simulateOrderProgress = (orderId: string, get: () => OrderState) => {
  setTimeout(() => {
    get().updateOrderStatus(orderId, 'confirmed');
  }, 10000);

  setTimeout(() => {
    get().updateOrderStatus(orderId, 'preparing');
  }, 30000);

  setTimeout(() => {
    get().updateOrderStatus(orderId, 'onTheWay');
  }, 60000);

  setTimeout(() => {
    get().updateOrderStatus(orderId, 'delivered');
  }, 120000);
};

const demoAddress: Address = {
  id: 'addr_1',
  title: 'Ev',
  address: 'Kadıköy, İstanbul, Türkiye',
  latitude: 40.9819,
  longitude: 29.0573,
  isDefault: true,
};

const demoPaymentInfo: PaymentInfo = {
  cardNumber: '**** **** **** 4242',
  cardHolder: 'Ahmet Yıldız',
  expiryDate: '12/27',
  cvv: '***',
};

const demoOrders: Order[] = [
  {
    id: 'order_001',
    customerId: 'user_customer_01',
    restaurantId: 'r1',
    restaurantName: 'Kebapçı Mehmet Usta',
    restaurantImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    items: [
      {
        menuItem: {
          id: 'm1',
          restaurantId: 'r1',
          name: 'Adana Kebap',
          description: 'Özel baharatlarla hazırlanmış el yapımı Adana kebap',
          price: 185,
          category: 'Kebaplar',
          isAvailable: true,
        },
        quantity: 2,
      },
      {
        menuItem: {
          id: 'm2',
          restaurantId: 'r1',
          name: 'Ayran',
          description: 'Taze yayık ayran',
          price: 20,
          category: 'İçecekler',
          isAvailable: true,
        },
        quantity: 2,
      },
    ],
    status: 'delivered',
    subtotal: 410,
    deliveryFee: 0,
    totalAmount: 410,
    deliveryAddress: demoAddress,
    paymentInfo: demoPaymentInfo,
    createdAt: '2026-07-10T12:30:00.000Z',
    updatedAt: '2026-07-10T13:15:00.000Z',
    estimatedDeliveryTime: 35,
  },
  {
    id: 'order_002',
    customerId: 'user_customer_01',
    restaurantId: 'r2',
    restaurantName: 'Pizza Napoli',
    restaurantImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    items: [
      {
        menuItem: {
          id: 'm3',
          restaurantId: 'r2',
          name: 'Margherita Pizza',
          description: 'Domates sosu, mozzarella ve fesleğen',
          price: 140,
          category: 'Pizzalar',
          isAvailable: true,
        },
        quantity: 1,
      },
      {
        menuItem: {
          id: 'm4',
          restaurantId: 'r2',
          name: 'Tiramisu',
          description: 'Ev yapımı İtalyan tiramisu',
          price: 75,
          category: 'Tatlılar',
          isAvailable: true,
        },
        quantity: 1,
      },
    ],
    status: 'cancelled',
    subtotal: 215,
    deliveryFee: 0,
    totalAmount: 215,
    deliveryAddress: demoAddress,
    paymentInfo: demoPaymentInfo,
    createdAt: '2026-07-09T18:45:00.000Z',
    updatedAt: '2026-07-09T19:00:00.000Z',
    estimatedDeliveryTime: 35,
  },
  {
    id: 'order_003',
    customerId: 'user_customer_01',
    restaurantId: 'r3',
    restaurantName: 'Sushi Master',
    restaurantImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    items: [
      {
        menuItem: {
          id: 'm5',
          restaurantId: 'r3',
          name: 'Salmon Nigiri Set',
          description: '8 parça taze somon nigiri',
          price: 220,
          category: 'Sushi',
          isAvailable: true,
        },
        quantity: 1,
      },
      {
        menuItem: {
          id: 'm6',
          restaurantId: 'r3',
          name: 'Miso Çorbası',
          description: 'Geleneksel Japon miso çorbası',
          price: 45,
          category: 'Çorbalar',
          isAvailable: true,
        },
        quantity: 2,
      },
    ],
    status: 'preparing',
    subtotal: 310,
    deliveryFee: 0,
    totalAmount: 310,
    deliveryAddress: demoAddress,
    paymentInfo: demoPaymentInfo,
    createdAt: '2026-07-14T14:00:00.000Z',
    updatedAt: '2026-07-14T14:10:00.000Z',
    estimatedDeliveryTime: 35,
  },
  {
    id: 'order_004',
    customerId: 'user_customer_01',
    restaurantId: 'r4',
    restaurantName: 'Burger House',
    restaurantImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    items: [
      {
        menuItem: {
          id: 'm7',
          restaurantId: 'r4',
          name: 'Classic Cheeseburger',
          description: 'Dana eti, cheddar, marul, domates ve özel sos',
          price: 135,
          category: 'Burgerler',
          isAvailable: true,
        },
        quantity: 2,
      },
      {
        menuItem: {
          id: 'm8',
          restaurantId: 'r4',
          name: 'Patates Kızartması',
          description: 'Çıtır patates kızartması',
          price: 45,
          category: 'Yan Ürünler',
          isAvailable: true,
        },
        quantity: 1,
      },
    ],
    status: 'pending',
    subtotal: 315,
    deliveryFee: 0,
    totalAmount: 315,
    deliveryAddress: demoAddress,
    paymentInfo: demoPaymentInfo,
    createdAt: '2026-07-14T17:00:00.000Z',
    updatedAt: '2026-07-14T17:00:00.000Z',
    estimatedDeliveryTime: 35,
  },
  {
    id: 'order_005',
    customerId: 'user_customer_01',
    restaurantId: 'r5',
    restaurantName: 'Çiğ Köfteci Ali Usta',
    restaurantImage: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400',
    items: [
      {
        menuItem: {
          id: 'm9',
          restaurantId: 'r5',
          name: 'Çiğ Köfte Dürüm',
          description: 'Nar ekşili, yeşillikli çiğ köfte dürüm',
          price: 65,
          category: 'Dürümler',
          isAvailable: true,
        },
        quantity: 3,
      },
      {
        menuItem: {
          id: 'm10',
          restaurantId: 'r5',
          name: 'Şalgam',
          description: 'Acılı şalgam suyu',
          price: 15,
          category: 'İçecekler',
          isAvailable: true,
        },
        quantity: 3,
      },
    ],
    status: 'confirmed',
    subtotal: 240,
    deliveryFee: 0,
    totalAmount: 240,
    deliveryAddress: demoAddress,
    paymentInfo: demoPaymentInfo,
    createdAt: '2026-07-14T16:30:00.000Z',
    updatedAt: '2026-07-14T16:35:00.000Z',
    estimatedDeliveryTime: 35,
  },
];

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: demoOrders,

  createOrder: (params: CreateOrderParams): Order => {
    const now = new Date().toISOString();
    const order: Order = {
      id: generateId(),
      customerId: params.customerId,
      restaurantId: params.restaurantId,
      restaurantName: params.restaurantName,
      restaurantImage: params.restaurantImage,
      items: params.items,
      status: 'pending',
      subtotal: params.subtotal,
      deliveryFee: params.deliveryFee,
      totalAmount: params.totalAmount,
      deliveryAddress: params.deliveryAddress,
      paymentInfo: params.paymentInfo,
      note: params.note,
      createdAt: now,
      updatedAt: now,
      estimatedDeliveryTime: 35,
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
