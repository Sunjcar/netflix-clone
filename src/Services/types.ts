export interface Movie {
  backdrop_path: string;
  poster_path: string;
  title: string;
  id: number;
  overview: string;
  logo: Logo;
  video: Video;
}
export interface Logo {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
}
export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export type Filter =
  | "Trending Now"
  | "Action & Adventure"
  | "Comedy"
  | "US Dramas"
  | "Anime"
  | "Documentary"
  | "Sci-Fi"
  | "For Kids";

export interface SliderFilter {
  filter: Filter;
  movieUrl?: string;
  tvUrl?: string;
  type?: string;
}

export type Tab = "home" | "tvshows" | "movies" | "mylist";

export type MediaType = "movie" | "tv";

export const isTab = (tab: string | undefined): tab is Tab => {
  if (!tab) return false;
  if (
    tab === "home" ||
    tab === "tvshows" ||
    tab === "movies" ||
    tab === "mylist"
  ) {
    return true;
  }

  return false;
};

export interface APIBase {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  video: boolean;
}

export interface MovieAPI extends APIBase {
  adult: boolean;
  title: string;
  release_date: string;
}

export interface TvAPI extends APIBase {
  name: string;
  air_date:string;
}

export type ShowAPI = MovieAPI | TvAPI

export interface APIRes {
  results: ShowAPI[]
}

export const isShowAPI = (input: MovieAPI | TvAPI): input is ShowAPI => {
  if (!input) return false;
  return true
}