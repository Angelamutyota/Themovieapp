import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, searchMovies } from '../services/api';

interface MovieCategory {
  movies: any[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;

}

export const useMovieStore = defineStore('movie', () => {
  const nowPlaying = ref<MovieCategory>({ movies: [], page: 1, totalPages: 1, loading: false, error: null });
  const popular = ref<MovieCategory>({ movies: [], page: 1, totalPages: 1, loading: false, error: null });
  const topRated = ref<MovieCategory>({ movies: [], page: 1, totalPages: 1, loading: false, error: null });
  const upcoming = ref<MovieCategory>({ movies: [], page: 1, totalPages: 1, loading: false, error: null });
  const searchResults = ref<MovieCategory>({ movies: [], page: 1, totalPages: 1, loading: false, error: null });
  const searchQuery = ref<string>('');

  async function loadNowPlaying() {
    nowPlaying.value.loading = true;
    nowPlaying.value.error = null;
    try {
      const data = await fetchNowPlayingMovies(nowPlaying.value.page);
      nowPlaying.value.movies = data.results;
      nowPlaying.value.totalPages = data.total_pages;
    } catch (error) {
      nowPlaying.value.error = 'Failed to load Now Playing movies';
      console.error('Now Playing error:', error);
    }
    nowPlaying.value.loading = false;
  }

  async function loadPopular() {
    popular.value.loading = true;
    popular.value.error = null;
    try {
      const data = await fetchPopularMovies(popular.value.page);
      popular.value.movies = data.results;
      popular.value.totalPages = data.total_pages;
    } catch (error) {
      popular.value.error = 'Failed to load Popular movies';
      console.error('Popular error:', error);
    }
    popular.value.loading = false;
  }

  async function loadTopRated() {
    topRated.value.loading = true;
    topRated.value.error = null;
    try {
      const data = await fetchTopRatedMovies(topRated.value.page);
      topRated.value.movies = data.results;
      topRated.value.totalPages = data.total_pages;
    } catch (error) {
      topRated.value.error = 'Failed to load Top Rated movies';
      console.error('Top Rated error:', error);
    }
    topRated.value.loading = false;
  }

  async function loadUpcoming() {
    upcoming.value.loading = true;
    upcoming.value.error = null;
    try {
      const data = await fetchUpcomingMovies(upcoming.value.page);
      upcoming.value.movies = data.results;
      upcoming.value.totalPages = data.total_pages;
    } catch (error) {
      upcoming.value.error = 'Failed to load Upcoming movies';
      console.error('Upcoming error:', error);
    }
    upcoming.value.loading = false;
  }

  async function search() {
    if (!searchQuery.value) return;
    searchResults.value.loading = true;
    searchResults.value.error = null;
    try {
      const data = await searchMovies(searchQuery.value, searchResults.value.page);
      searchResults.value.movies = data.results;
      searchResults.value.totalPages = data.total_pages;
    } catch (error) {
      searchResults.value.error = 'Failed to load search results';
      console.error('Search error:', error);
    }
    searchResults.value.loading = false;
  }


  return {
    nowPlaying,
    popular,
    topRated,
    upcoming,
    searchResults,
    searchQuery,
    loadNowPlaying,
    loadPopular,
    loadTopRated,
    loadUpcoming,
    search,
  };
});