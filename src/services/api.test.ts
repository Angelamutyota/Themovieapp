import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPopularMovies } from './api';
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
});