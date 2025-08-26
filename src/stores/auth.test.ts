import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuthStore } from './auth';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, type User, type UserCredential, type NextOrObserver } from 'firebase/auth';

// Mock Firebase auth module
vi.mock('@/firebase', () => ({
  auth: {} as any, // Use 'as any' to bypass strict typing for the mock
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  it('logs in successfully', async () => {
    const mockUser: User = { uid: '123', email: 'amutyota@gmail.outlook.com' } as User;

    // Mock onAuthStateChanged to simulate a logged-in user
    vi.mocked(onAuthStateChanged).mockImplementation((_, nextOrObserver: NextOrObserver<User>) => {
      if (typeof nextOrObserver === 'function') {
        nextOrObserver(mockUser); // Call the function directly if it's a callback
      } else {
        nextOrObserver.next?.(mockUser); // Call the next method if it's an observer object
      }
      return () => {}; // Return unsubscribe function
    });

    // Mock signInWithEmailAndPassword to resolve successfully
    vi.mocked(signInWithEmailAndPassword).mockResolvedValue({ user: mockUser } as UserCredential);

    const store = useAuthStore();
    await store.login('amutyota@gmail.com', 'Pass@word1');

    expect(store.user).toEqual(mockUser);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });
});