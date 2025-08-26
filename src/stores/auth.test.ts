import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuthStore } from './auth';

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('logs in successfully', async () => {
    const store = useAuthStore();
    await store.login('amutyota@gmail.com', 'Pass@word1');
    expect(store.user).not.toBeNull();
  });
});
