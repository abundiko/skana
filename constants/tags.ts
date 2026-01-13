export const tags = {
  storage: {
    settings: "_settings_",
    savedMovies: "__saved-movies",
    lastWatchTime: "_movies-last-watch-time",
    viewHistory: "_movies-view-history",
    wathHistory: "_movies-watch-history",
    preferences: "_preferences",
    monitoringData: "_monitoring-data"
  },
  query: {
    movies: "movies",
    genres: "genres",
    languages: "languages",
    moviesByGenre: "movies-by-genre",
    moviesByLanguage: "movies-by-language",
    movieSingle: "movies-single",
    movieStream: "movies-stream",
  },
  sheets: {
    theme: "theme-sheet",
    update: "update-sheet",
    movieDownload: (id: string) => `movie-download-sheet-${id}`,
  },
} as const;
