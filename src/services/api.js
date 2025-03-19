import axios from "axios";
const API_KEY = "1382f1df05d469fea119ea7af8c36f77";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      page: page,
    },
  });
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: encodeURIComponent(query),
      page: page,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieName, page = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieName}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page: page,
    },
  });
  return response.data;
};

/*export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};*/
