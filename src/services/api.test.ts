import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from './api';
import axios from 'axios';

// Mock the axios module
vi.mock('axios', () => {
  const mockAxiosInstance = {
    get: vi.fn(),
  };
  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
    },
  };
});

describe('apiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('VITE_TMDB_API_KEY', 'test-key');
  });

  it('fetches now playing movies', async () => {
    const mockData = {
      page: 1,
      results: [
        { 
            id: 1, 
            title: 'Test Movie', 
            overview: 'Test', 
            poster_path: '/test.jpg', 
            vote_average: 7.0, 
            release_date: '2025-01-01'
         }
        ],
      total_pages: 10,
      total_results: 100,
    };
    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.get).mockResolvedValue({ data: mockData });

    const result = await fetchNowPlayingMovies(1);
    expect(result).toEqual(mockData);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/movie/now_playing', { params: { page: 1 } });
  });

  it('fetches popular movies', async () => {
    const mockData = {
      page: 1,
      results: [
        {
          id: 755898,
          title: 'War of the Worlds',
          overview: 'Will Radford is a top analyst for Homeland Security...',
          poster_path: '/yvirUYrva23IudARHn3mMGVxWqM.jpg',
          vote_average: 4.188,
          release_date: '2025-07-29',
        },
      ],
      total_pages: 52013,
      total_results: 1040248,
    };
    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.get).mockResolvedValue({ data: mockData });

    const result = await fetchPopularMovies(1);

    expect(result).toEqual(mockData);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/movie/popular', {
      params: { page: 1 },
    });
  });

   it('fetches top rated movies', async () => {
    const mockData = {
      page: 1,
      results: [
        { 
            id: 1, 
            title: 'Test Movie', 
            overview: 'Test', 
            poster_path: '/test.jpg', 
            vote_average: 7.0, 
            release_date: '2025-01-01' 
        }
    ],
      total_pages: 10,
      total_results: 100,
    };
    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.get).mockResolvedValue({ data: mockData });

    const result = await fetchTopRatedMovies(1);
    expect(result).toEqual(mockData);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/movie/top_rated', { params: { page: 1 } });
  });

  it('fetches upcoming movies', async () => {
    const mockData = {
      page: 1,
      results: [
        { 
            id: 1, 
            title: 'Test Movie', 
            overview: 'Test', 
            poster_path: '/test.jpg', 
            vote_average: 7.0, 
            release_date: '2025-01-01' 
        }
    ],
      total_pages: 10,
      total_results: 100,
    };
    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.get).mockResolvedValue({ data: mockData });

    const result = await fetchUpcomingMovies(1);
    expect(result).toEqual(mockData);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/movie/upcoming', { params: { page: 1 } });
  });
});