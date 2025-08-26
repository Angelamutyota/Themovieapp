<template>
  <div class="container mx-auto px-4 py-6 ">
    <div class="relative mb-6">
      <input
        v-model="movieStore.searchQuery"
        type="text"
        placeholder="Search Movies"
        class="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @input="debouncedSearch"
      />
     
      <button
        v-if="movieStore.searchQuery"
        class="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        @click="movieStore.searchQuery = ''"
      >
        search
      </button>
    </div>
    <div v-if="movieStore.searchResults.loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    <div v-if="movieStore.searchResults.movies.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="movie in movieStore.searchResults.movies"
        :key="movie.id"
        class="bg-blue-600 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        @click="goToMovie(movie.id)"
      >
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'"
          alt="Movie Poster"
          class="w-full h-96 object-cover rounded-t-lg"
        />
        <div class="p-4">
          <h3 class="text-lg text-white font-semibold">{{ movie.title }}</h3>
          <p class="text-white text-sm">{{ truncateOverview(movie.overview) }}</p>
        </div>
      </div>
    </div>
  <div v-if="movieStore.searchResults.totalPages > 1" class="flex justify-center mt-6">
      <nav class="inline-flex gap-2 items-center">
        <button
          class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          :disabled="movieStore.searchResults.page === 1"
          @click="goToPage(movieStore.searchResults.page - 1)"
        >
          Previous
        </button>
        <span class="px-4 py-2 rounded-md bg-blue-500 text-white">
          Page {{ movieStore.searchResults.page }} of {{ movieStore.searchResults.totalPages }}
        </span>
        <button
          class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          :disabled="movieStore.searchResults.page === movieStore.searchResults.totalPages"
          @click="goToPage(movieStore.searchResults.page + 1)"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useMovieStore } from '../stores/movieStore';
import { debounce } from 'lodash';

const movieStore = useMovieStore();
const router = useRouter();

const debouncedSearch = debounce(() => {
  if (movieStore.searchQuery) movieStore.search();
}, 500);

function truncateOverview(overview: string, maxLength: number = 100) {
  return overview.length > maxLength ? overview.slice(0, maxLength) + '...' : overview;
}

function goToMovie(id: number) {
  router.push(`/movie/${id}`);
}

function goToPage(page: number) {
  if (page >= 1 && page <= movieStore.searchResults.totalPages) {
    movieStore.searchResults.page = page;
    movieStore.search();
  }
}
</script>