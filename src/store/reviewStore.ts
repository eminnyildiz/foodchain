import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Review } from '../types';

interface ReviewState {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => Review;
  getReviewsByRestaurant: (restaurantId: string) => Review[];
  getAverageRating: (restaurantId: string) => number;
  getReviewCount: (restaurantId: string) => number;
  hasUserReviewedOrder: (userId: string, orderId: string) => boolean;
}

const generateId = (): string => 'rev_' + Math.random().toString(36).substring(2, 10);

const demoReviews: Review[] = [
  {
    id: 'rev_demo_01',
    orderId: 'order_001',
    userId: 'user_customer_01',
    restaurantId: 'r1',
    rating: 5,
    comment: 'Adana kebap mükemmeldi, çok lezzetli!',
    createdAt: '2026-07-10T14:00:00.000Z',
  },
  {
    id: 'rev_demo_02',
    orderId: 'order_demo_02',
    userId: 'user_demo_02',
    restaurantId: 'r1',
    rating: 4,
    comment: 'Porsiyon güzel, teslimat biraz geç geldi.',
    createdAt: '2026-07-08T18:30:00.000Z',
  },
  {
    id: 'rev_demo_03',
    orderId: 'order_demo_03',
    userId: 'user_demo_03',
    restaurantId: 'r2',
    rating: 5,
    comment: 'En iyi pizza İstanbul\'da burada!',
    createdAt: '2026-07-05T12:15:00.000Z',
  },
  {
    id: 'rev_demo_04',
    orderId: 'order_demo_04',
    userId: 'user_demo_04',
    restaurantId: 'r3',
    rating: 4,
    comment: 'Somon tazeydi, sunum çok güzel.',
    createdAt: '2026-07-12T20:00:00.000Z',
  },
  {
    id: 'rev_demo_05',
    orderId: 'order_demo_05',
    userId: 'user_demo_05',
    restaurantId: 'r4',
    rating: 3,
    comment: 'Burger fena değil ama patates soğuktu.',
    createdAt: '2026-07-11T13:45:00.000Z',
  },
  {
    id: 'rev_demo_06',
    orderId: 'order_demo_06',
    userId: 'user_demo_06',
    restaurantId: 'r5',
    rating: 5,
    comment: 'Çiğ köfte dürüm harika, her zaman sipariş veriyorum!',
    createdAt: '2026-07-09T16:20:00.000Z',
  },
];

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: demoReviews,

      addReview: (reviewData): Review => {
        const review: Review = {
          ...reviewData,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ reviews: [review, ...state.reviews] }));
        return review;
      },

      getReviewsByRestaurant: (restaurantId: string): Review[] => {
        return get()
          .reviews.filter((r) => r.restaurantId === restaurantId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },

      getAverageRating: (restaurantId: string): number => {
        const restaurantReviews = get().reviews.filter((r) => r.restaurantId === restaurantId);
        if (restaurantReviews.length === 0) return 0;
        const sum = restaurantReviews.reduce((acc, r) => acc + r.rating, 0);
        return Math.round((sum / restaurantReviews.length) * 10) / 10;
      },

      getReviewCount: (restaurantId: string): number => {
        return get().reviews.filter((r) => r.restaurantId === restaurantId).length;
      },

      hasUserReviewedOrder: (userId: string, orderId: string): boolean => {
        return get().reviews.some(
          (r) => r.userId === userId && r.orderId === orderId
        );
      },
    }),
    {
      name: 'foodchain-reviews',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        reviews: state.reviews,
      }),
    }
  )
);
