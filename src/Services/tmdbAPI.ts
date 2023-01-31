import axios from "axios";
import { TvShow, Movie } from "../Components/State/types";
import { config } from "./config";
import { Logo, MediaType, SliderFilter, Tab } from "./types";

export const URL = "https://api.themoviedb.org/3"
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

const getShowForBillboard = async (
  tab: Tab
): Promise<Movie | TvShow | null> => {
  const type: MediaType = tabType(tab);

  const response = await axios.get(
    `${URL}/${type}/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  if (response && response.status === 200) {
    const shows = response.data.results.filter(
      (data: Movie) => !!data.overview
    );
    let show = shows[Math.floor((Math.random() * shows.length) / 2)];
    while (!show.logo) {
      show = shows[Math.floor((Math.random() * shows.length) / 2)];
      const logo_response =
        await axios.get(`${URL}/${type}/${show.id}/images?api_key=${API_KEY}
    `);

      if (logo_response.status === 200)
        show.logo = logo_response.data.logos.find(
          (logo: Logo) => logo.iso_639_1 === "en"
        );
    }

    return type === 'tv'
    ? {
      type: "tv",
      backdrop_path: show.backdrop_path,
      poster_path: show.poster_path,
      id: show.id,
      overview: show.overview,
      logo: show.logo,
      name: show.name,
    }
  : {
      type: "movie",
      backdrop_path: show.backdrop_path,
      poster_path: show.poster_path,
      id: show.id,
      overview: show.overview,
      logo: show.logo,
      title: show.title,
    };
      
  }

  return null;
};

export default {
  getShowForBillboard
}