<template>
  <v-container>
    <v-text-field
      v-model="movieStore.searchQuery"
      label="Search Movies"
      prepend-inner-icon="mdi-magnify"
      clearable
      @input="debouncedSearch"
    />
    <v-progress-linear v-if="movieStore.searchResults.loading" indeterminate color="primary" />
    <v-row v-if="movieStore.searchResults.movies.length">
      <v-col v-for="movie in movieStore.searchResults.movies" :key="movie.id" cols="12" sm="6" md="4">
        <v-card @click="goToMovie(movie.id)">
          <v-img
            :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'"
            aspect-ratio="2/3"
            cover
          />
          <v-card-title>{{ movie.title }}</v-card-title>
          <v-card-text>{{ truncateOverview(movie.overview) }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-if="movieStore.searchResults.totalPages > 1"
      v-model="movieStore.searchResults.page"
      :length="movieStore.searchResults.totalPages"
      @update:modelValue="movieStore.search()"
    />
  </v-container>
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