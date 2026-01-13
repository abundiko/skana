import { buildUrlQuery } from "@/functions/helpers";

export const BACKEND_HOST = `https://movee.vercel.app/api/v3`;

export const endpoints = {
  movies: `${BACKEND_HOST}/movies`,
  genres: `${BACKEND_HOST}/utils/genres`,
  languages: `${BACKEND_HOST}/utils/languages`,
  moviesByGenre: `${BACKEND_HOST}/movies/tag`,
  moviesByLanguage: `${BACKEND_HOST}/movies/language`,
  moviesBySearch: `${BACKEND_HOST}/movies/search`,
  movieSingle: (id: string) => `${BACKEND_HOST}/movies/${id}`,
  movieDownload: (id: string, isSub = false, redirect = false) =>
    `${BACKEND_HOST}/download${id}${buildUrlQuery({
      redirect: String(redirect),
      subtitle: String(isSub),
    })}`,
} as const;
