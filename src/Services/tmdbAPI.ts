import axios from "axios";
import { config } from "./config";
import { Logo, MediaType, SliderFilter, Tab, APIRes, ShowAPI, TvShow, Movie, Show } from "./types";

export const URL = "https://api.themoviedb.org/3";
const API_KEY = config.MY_API_KEY;

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
};

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

const getShowData = (shows: ShowAPI[]): Show[] => {
  const withPoster = shows.filter((show) => !!show.poster_path);
  const results = withPoster.map((show) => {
    if ("title" in show) {
      return {
        type: "movie" as const,
        backdrop_path: show.backdrop_path,
        poster_path: show.poster_path,
        id: show.id,
        overview: show.overview,
        title: show.title,
      };
    } else
      return {
        type: "tv" as const,
        backdrop_path: show.backdrop_path,
        poster_path: show.poster_path,
        id: show.id,
        overview: show.overview,
        name: show.name,
      };
  });

  return results;
};

const getShowsLists = async (url: string): Promise<Show[] | undefined> => {
  const url_1 = url + "&page=1";
  const url_2 = url + "&page=2";

  const response_1 = await axios.get<APIRes>(url_1);

  const response_2 = await axios.get<APIRes>(url_2);

  const dataset1 = response_1.status === 200 ? response_1.data.results : null;
  const dataset2 = response_1.status === 200 ? response_2.data.results : null;

  if (dataset1 && dataset2) {
    const dataset = getShowData(dataset1).concat(getShowData(dataset2));
    return dataset;
  }

  return;
};

export default {
  getShowForBillboard,
  sliderOptions,
  getShowsLists,
};