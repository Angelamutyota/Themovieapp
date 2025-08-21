<template>
  <div class="container mx-auto px-4 py-6">
    <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
    <div v-if="loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        @click="goToMovie(movie.id)"
      >
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'"
          alt="Movie Poster"
          class="w-full h-96 object-cover rounded-t-lg"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold">{{ movie.title }}</h3>
          <p class="text-gray-600 text-sm">{{ truncateOverview(movie.overview) }}</p>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <nav class="inline-flex gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          :class="[
            'px-4 py-2 rounded-md',
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
          @click="emit('update:page', page); fetchMovies()"
        >
          {{ page }}
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

function fetchMovies() {
  emit('update:page', currentPage.value);
}

function goToMovie(id: number) {
  router.push(`/movie/${id}`);
}
</script>