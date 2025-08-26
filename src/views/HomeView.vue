<template>
  <div class="w-full min-h-screen bg-blue-800">
    <NavBar />

    <div class="container mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold mb-6 text-white">Movie Recommendations</h1>
      <SearchBar />
      <div
        v-if="movieStore.nowPlaying.error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >
        {{ movieStore.nowPlaying.error }}
      </div>
      <MovieList
        title="Now Playing"
        :movies="movieStore.nowPlaying.movies"
        :loading="movieStore.nowPlaying.loading"
        :total-pages="movieStore.nowPlaying.totalPages"
        :page="movieStore.nowPlaying.page"
        @update:page="
          movieStore.nowPlaying.page = $event;
          movieStore.loadNowPlaying();
        "
      />
      <div
        v-if="movieStore.popular.error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >
        {{ movieStore.popular.error }}
      </div>
      <MovieList
        title="Popular"
        :movies="movieStore.popular.movies"
        :loading="movieStore.popular.loading"
        :total-pages="movieStore.popular.totalPages"
        :page="movieStore.popular.page"
        @update:page="
          movieStore.popular.page = $event;
          movieStore.loadPopular();
        "
      />
      <div
        v-if="movieStore.topRated.error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >
        {{ movieStore.topRated.error }}
      </div>
      <MovieList
        title="Top Rated"
        :movies="movieStore.topRated.movies"
        :loading="movieStore.topRated.loading"
        :total-pages="movieStore.topRated.totalPages"
        :page="movieStore.topRated.page"
        @update:page="
          movieStore.topRated.page = $event;
          movieStore.loadTopRated();
        "
      />
      <div
        v-if="movieStore.upcoming.error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >
        {{ movieStore.upcoming.error }}
      </div>
      <MovieList
        title="Upcoming"
        :movies="movieStore.upcoming.movies"
        :loading="movieStore.upcoming.loading"
        :total-pages="movieStore.upcoming.totalPages"
        :page="movieStore.upcoming.page"
        @update:page="
          movieStore.upcoming.page = $event;
          movieStore.loadUpcoming();
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMovieStore } from '../stores/movieStore';
import MovieList from '../components/MovieList.vue';
import SearchBar from '@/components/SearchBar.vue';
import NavBar from '@/components/NavBar.vue';

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

interface MovieCategory {
  movies: any[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

interface MovieStore {
  nowPlaying: MovieCategory;
  popular: MovieCategory;
  topRated: MovieCategory;
  upcoming: MovieCategory;
  searchResults: MovieCategory;
  searchQuery: string;
  loadNowPlaying: () => Promise<void>;
  loadPopular: () => Promise<void>;
  loadTopRated: () => Promise<void>;
  loadUpcoming: () => Promise<void>;
  search: () => Promise<void>;
}
const movieStore = useMovieStore();

onMounted(() => {
  console.log('HomeView mounted');
  movieStore.loadNowPlaying();
  movieStore.loadPopular();
  movieStore.loadTopRated();
  movieStore.loadUpcoming();
  setTimeout(() => {
    console.log('Now Playing:', movieStore.nowPlaying);
    console.log('Popular:', movieStore.popular);
    console.log('Top Rated:', movieStore.topRated);
    console.log('Upcoming:', movieStore.upcoming);
  }, 2000);
});
</script>
