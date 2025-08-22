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
      <!-- <svg
        class="absolute left-3 top-3 h-2 w-2 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg> -->
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
    <div v-if="movieStore.searchResults.totalPages > 1" class="flex justify-center mt-6">
      <nav class="inline-flex gap-2">
        <button
          v-for="page in movieStore.searchResults.totalPages"
          :key="page"
          :class="[
            'px-4 py-2 rounded-md',
            movieStore.searchResults.page === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
          @click="movieStore.searchResults.page = page; movieStore.search()"
        >
          {{ page }}
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
</script>