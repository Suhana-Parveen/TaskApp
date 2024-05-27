import axios from 'axios';

const API_KEY: string = '2dca580c2a14b55200e784d157207b4d';
const BASE_URL: string = 'https://api.themoviedb.org/3';

interface Movie {}

interface Genre {}

const getMoviesByYear = async (year: number, page: number = 1): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        sort_by: 'popularity.desc',
        primary_release_year: year,
        page: page,
        'vote_count.gte': 100,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY },
    });
    return response.data.genres;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getMoviesByYear, getGenres };
