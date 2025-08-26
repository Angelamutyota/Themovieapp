<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import LogoutButton from '@/components/LogoutButton.vue';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();
</script>

<template>
  <nav class="w-full flex justify-between items-center p-4 bg-blue-900 text-white">
    <!-- Left side: Home link -->
    <RouterLink
      to="/"
      class="text-lg font-semibold hover:text-blue-300 transition"
    >
      Movie App
    </RouterLink>

    <!-- Right side: Auth controls -->
    <div class="flex items-center gap-4">
      <div v-if="authStore.loadingAuth" class="text-white">Loading...</div>
      <template v-else>
        <LogoutButton v-if="authStore.user" />
        <RouterLink
          v-else
          to="/login"
          class="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </RouterLink>
      </template>
    </div>
  </nav>
</template>