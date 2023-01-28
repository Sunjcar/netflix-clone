import axios from "axios";
import { config } from "./config";
import { MediaType, SliderFilter, Tab } from "./types";

const URL = "https://api.themoviedb.org/3"
const API_KEY = config.MY_API_KEY

const sliderOptions: SliderFilter[] = [
  {
    filter: "Trending Now",
    movieUrl: `${URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`,
    tvUrl: `${URL}/trending/tv/day?api_key=${API_KEY}&language=en-US`,
  },
  {
    filter: "Action & Adventure",
    movieUrl: `${URL}/discover/movie/?api_key=${API_KEY}&language=en-US&include_adult=false&region=US&with_genres=28`,
    tvUrl: `${URL}/discover/tv/?api_key=${API_KEY}&language=en-US&include_adult=false&region=US&with_genres=10759`,
  },
  {
    filter: "Sci-Fi",
    movieUrl: `${URL}/discover/movie/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=878`,
    tvUrl: `${URL}/discover/tv/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=10765`,
  },
  {
    filter: "Documentary",
    movieUrl: `${URL}/discover/movie/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=99`,
    tvUrl: `${URL}/discover/tv/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=99`,
  },
  {
    filter: "Comedy",
    movieUrl: `${URL}/discover/movie/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=35`,
    tvUrl: `${URL}/discover/tv/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=35`,
  },
];

const tabType = (tab: Tab): MediaType => {
  return tab === 'home'
    ? Math.random() > 0.5
      ? 'movie'
      : 'tv'
    : tab === 'movies'
      ? 'movie'
      : 'tv';
}