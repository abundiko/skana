export const tags = {
  storage: {
    settings: "_settings_",
    preferences: "_preferences",
    account: "_account_",
  },
  query: {
   
  },
  sheets: {
    theme: "theme-sheet",
    update: "update-sheet",
    movieDownload: (id: string) => `movie-download-sheet-${id}`,
  },
} as const;
