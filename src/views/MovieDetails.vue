<template>
  <div class="container mx-auto px-4 py-6">
    <div v-if="loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    <div v-if="movie" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'"
          alt="Movie Poster"
          class="w-full h-96 object-cover rounded-lg"
        />
      </div>
      <div class="md:col-span-2">
        <h1 class="text-3xl font-bold mb-4">{{ movie.title }}</h1>
        <p class="mb-2"><strong>Overview:</strong> {{ movie.overview }}</p>
        <p class="mb-2"><strong>Rating:</strong> {{ movie.vote_average }} / 10</p>
        <p class="mb-2"><strong>Release Date:</strong> {{ movie.release_date }}</p>
        <p class="mb-2"><strong>Runtime:</strong> {{ movie.runtime ? `${movie.runtime} minutes` : 'N/A' }}</p>
        <p class="mb-4"><strong>Genres:</strong> {{ movie.genres?.map((g: { name: any; }) => g.name).join(', ') }}</p>
        <h3 class="text-xl font-semibold mb-2">Cast</h3>
        <ul class="list-disc pl-5 mb-4">
          <li v-for="actor in credits.cast.slice(0, 5)" :key="actor.id" class="text-gray-700">
            {{ actor.name }} as {{ actor.character }}
          </li>
        </ul>
        <h3 class="text-xl font-semibold mb-2">Crew</h3>
        <ul class="list-disc pl-5">
          <li v-for="member in credits.crew.slice(0, 5)" :key="member.id" class="text-gray-700">
            {{ member.name }} ({{ member.job }})
          </li>
        </ul>
      </div>
    </div>
  </div>
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