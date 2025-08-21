<template>
  <v-container>
    <v-progress-linear v-if="loading" indeterminate color="primary" />
    <v-row v-if="movie">
      <v-col cols="12" md="4">
        <v-img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'"
          aspect-ratio="2/3"
          cover
        />
      </v-col>
      <v-col cols="12" md="8">
        <h1>{{ movie.title }}</h1>
        <p><strong>Overview:</strong> {{ movie.overview }}</p>
        <p><strong>Rating:</strong> {{ movie.vote_average }} / 10</p>
        <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
        <p><strong>Runtime:</strong> {{ movie.runtime ? `${movie.runtime} minutes` : 'N/A' }}</p>
        <!-- <p><strong>Genres:</strong> {{ movie.genres?.map(g => g.name).join(', ') }}</p> -->
        <h3>Cast</h3>
        <v-list>
          <v-list-item v-for="actor in credits.cast.slice(0, 5)" :key="actor.id">
            {{ actor.name }} as {{ actor.character }}
          </v-list-item>
        </v-list>
        <h3>Crew</h3>
        <v-list>
          <v-list-item v-for="member in credits.crew.slice(0, 5)" :key="member.id">
            {{ member.name }} ({{ member.job }})
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchMovieDetails, fetchMovieCredits } from '../services/api';

const route = useRoute();
const movie = ref<any>(null);
const credits = ref<any>({ cast: [], crew: [] });
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const movieId = Number(route.params.id);
  try {
    movie.value = await fetchMovieDetails(movieId);
    credits.value = await fetchMovieCredits(movieId);
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
});
</script>