<template>
<div class="w-full min-h-screen px-4 py-6 bg-blue-800">
    <h2 class="text-2xl font-bold mb-4 bg-blue-900 ">{{ title }}</h2>
    <div v-if="loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
<div class="grid grid-cols-2 md:grid-cols-5 gap-6">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="bg-blue-600 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        @click="goToMovie(movie.id)"
      >
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'"
          alt="Movie Poster"
          class="w-full h-80 object-cover rounded-t-lg"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold truncate">{{ movie.title }}</h3>
          <p class="text-white text-xs line-clamp-3">{{ truncateOverview(movie.overview) }}</p>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-6">
  <nav class="inline-flex gap-2 items-center">
    <!-- Previous -->
    <button
      class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Previous
    </button>

    <!-- Current page indicator -->
    <span class="px-4 py-2 rounded-md bg-blue-500 text-gray-700">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <!-- Next -->
    <button
      class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Next
    </button>
  </nav>
</div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  title: string;
  movies: any[];
  loading: boolean;
  totalPages: number;
  page: number;
}>();

const emit = defineEmits<{
  (e: 'update:page', value: number): void;
}>();

const router = useRouter();

const currentPage = computed({
  get: () => props.page,
  set: (value) => emit('update:page', value),
});

function truncateOverview(overview: string, maxLength: number = 100) {
  return overview.length > maxLength ? overview.slice(0, maxLength) + '...' : overview;
}


function goToMovie(id: number) {
  router.push(`/movie/${id}`);
}

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:page', page);
  }
}

</script>