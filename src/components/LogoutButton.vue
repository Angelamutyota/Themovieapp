<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

async function handleLogout() {
  await authStore.logout();
  // Optionally redirect to login page
}
</script>

<template>
  <button @click="handleLogout" class="bg-red-500 text-white p-2 rounded">
    Logout
  </button>
</template>