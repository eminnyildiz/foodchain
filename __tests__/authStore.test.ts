import { useAuthStore } from '../src/store/authStore';

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('initializes with null user', () => {
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it('updates profile', () => {
    useAuthStore.getState().setUser({
      id: 'test_id',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '',
      role: 'customer',
      addresses: [],
      createdAt: '2023-01-01T00:00:00.000Z',
    });
    
    useAuthStore.getState().updateProfile({ firstName: 'Jane' });
    expect(useAuthStore.getState().user?.firstName).toBe('Jane');
    expect(useAuthStore.getState().user?.lastName).toBe('Doe');
  });

  it('logs out successfully', () => {
    useAuthStore.getState().setUser({
      id: 'test_id',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '',
      role: 'customer',
      addresses: [],
      createdAt: '2023-01-01T00:00:00.000Z',
    });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});
