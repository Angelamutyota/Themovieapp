<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const isSignup = ref(false);  
const router = useRouter();

async function handleSubmit() {
  if (isSignup.value) {
    await authStore.signup(email.value, password.value);
  } else {
    await authStore.login(email.value, password.value);
  }
  if (!authStore.error) {
    console.log('Authentication successful, redirecting to home...'); 
    router.push('/');
  }
}
</script>

<template>
      <div class="w-full min-h-screen flex items-center justify-center bg-blue-800">
  <div class="max-w-md mx-auto p-6 bg-blue-800 rounded-lg shadow-md">
    <h2 class="text-2xl text-white font-bold mb-4">{{ isSignup ? 'Sign Up' : 'Login' }}</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 mb-4 border rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 mb-4 border rounded" required />
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded" :disabled="authStore.loading">
        {{ authStore.loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Login') }}
      </button>
      <p v-if="authStore.error" class="text-red-500 mt-2">{{ authStore.error }}</p>
    </form>
    <button @click="isSignup = !isSignup" class="mt-4 text-blue-500">
      {{ isSignup ? 'Switch to Login' : 'Switch to Sign Up' }}
    </button>
  </div>
  </div>
</template>