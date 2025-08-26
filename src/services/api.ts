import axios from 'axios';

// TMDB API configuration
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE_URL = 'https://api.themoviedb.org/3';

// Simple in-memory cache
const cache = new Map<string, any>();

// Axios instance for TMDB API
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Interfaces for TMDB response types
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  backdrop_path?: string | null;
  genre_ids?: number[];
  popularity?: number;
  original_language?: string;
  original_title?: string;
  adult?: boolean;
  video?: boolean;
  vote_count?: number;
}

interface PaginatedResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface MovieDetails extends Movie {
  runtime: number | null;
  genres: { id: number; name: string }[];
}

interface MovieCredits {
  cast: { id: number; name: string; character: string }[];
  crew: { id: number; name: string; job: string }[];
}

// Fetch now playing movies with pagination
export async function fetchNowPlayingMovies(page: number = 1): Promise<PaginatedResponse> {
  const cacheKey = `now_playing-${page}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  try {
    const response = await api.get<PaginatedResponse>('/movie/now_playing', {
      params: { page },
    });
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
}

// Fetch popular movies with pagination
export async function fetchPopularMovies(page: number = 1): Promise<PaginatedResponse> {
  const cacheKey = `popular-${page}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  try {
    const response = await api.get<PaginatedResponse>('/movie/popular', {
      params: { page },
    });
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
}

// Fetch top rated movies with pagination
export async function fetchTopRatedMovies(page: number = 1): Promise<PaginatedResponse> {
  const cacheKey = `top_rated-${page}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  try {
    const response = await api.get<PaginatedResponse>('/movie/top_rated', {
      params: { page },
    });
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
}

// Fetch upcoming movies with pagination
export async function fetchUpcomingMovies(page: number = 1): Promise<PaginatedResponse> {
  const cacheKey = `upcoming-${page}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  try {
    const response = await api.get<PaginatedResponse>('/movie/upcoming', {
      params: { page },
    });
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
}

// Search movies by query with pagination
export async function searchMovies(query: string, page: number = 1): Promise<PaginatedResponse> {
  const cacheKey = `search-${query}-${page}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  try {
    const response = await api.get<PaginatedResponse>('/search/movie', {
      params: { query, page },
    });
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}

// Fetch movie details by ID
export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const cacheKey = `details-${id}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  try {
    const response = await api.get<MovieDetails>(`/movie/${id}`);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ${id}:`, error);
    throw error;
  }
}

// Fetch movie credits by ID
export async function fetchMovieCredits(id: number): Promise<MovieCredits> {
  const cacheKey = `credits-${id}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  try {
    const response = await api.get<MovieCredits>(`/movie/${id}/credits`);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching credits for movie ${id}:`, error);
    throw error;
  }
}
