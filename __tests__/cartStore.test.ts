import { useCartStore } from '../src/store/cartStore';

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('adds an item to an empty cart', () => {
    const success = useCartStore.getState().addItem(
      { id: 'item1', name: 'Burger', price: 50, description: '', categoryId: '', restaurantId: 'r1', isAvailable: true },
      { id: 'r1', name: 'Burger Place' }
    );
    expect(success).toBe(true);
    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.restaurantId).toBe('r1');
    expect(state.restaurantName).toBe('Burger Place');
  });

  it('fails to add an item from a different restaurant', () => {
    useCartStore.getState().addItem(
      { id: 'item1', name: 'Burger', price: 50, description: '', categoryId: '', restaurantId: 'r1', isAvailable: true },
      { id: 'r1', name: 'Burger Place' }
    );
    const success = useCartStore.getState().addItem(
      { id: 'item2', name: 'Pizza', price: 80, description: '', categoryId: '', restaurantId: 'r2', isAvailable: true },
      { id: 'r2', name: 'Pizza Place' }
    );
    expect(success).toBe(false);
    expect(useCartStore.getState().items.length).toBe(1);
  });

  it('increments quantity when adding the same item', () => {
    useCartStore.getState().addItem(
      { id: 'item1', name: 'Burger', price: 50, description: '', categoryId: '', restaurantId: 'r1', isAvailable: true },
      { id: 'r1', name: 'Burger Place' }
    );
    useCartStore.getState().addItem(
      { id: 'item1', name: 'Burger', price: 50, description: '', categoryId: '', restaurantId: 'r1', isAvailable: true },
      { id: 'r1', name: 'Burger Place' }
    );
    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('calculates totals correctly', () => {
    useCartStore.getState().addItem(
      { id: 'item1', name: 'Burger', price: 50, description: '', categoryId: '', restaurantId: 'r1', isAvailable: true },
      { id: 'r1', name: 'Burger Place' }
    );
    const state = useCartStore.getState();
    expect(state.getSubtotal()).toBe(50);
    // Subtotal 50 -> delivery fee is 10
    expect(state.getDeliveryFee()).toBe(10);
    expect(state.getTotal()).toBe(60);
  });
});
