export const tags = {
  storage: {
    settings: "__settings_",
    preferences: "_preferences",
    account: "__account__",
  },
  query: {
    transactions: "transactions",
  },
  sheets: {
    theme: "theme-sheet",
    update: "update-sheet",
    movieDownload: (id: string) => `movie-download-sheet-${id}`,
  },
} as const;
