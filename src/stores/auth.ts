import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '@/firebase';  
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, type User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  loadingAuth: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const loadingAuth = ref(true);

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    loadingAuth.value = false;
  });

  async function login(email: string, password: string) {
    loading.value = true;
    error.value = null;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  }

  async function signup(email: string, password: string) {
    loading.value = true;
    error.value = null;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      error.value = (err as Error).message;
    }
  }

  return { user, loading, error, login, signup, logout, loadingAuth };
});