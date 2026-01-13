export const UPDATE_HISTORY = [
  {
    date: "25-12-2025",
    title: "Merry Christmas Update",
    features: [
      "Swipe right on movie cover in movie screen to watch trailer",
      "long press movie cover on movie screen to see cover image better",
      "Bug fixes and improvements",
      "New! home screen widget you should try",
    ],
    version: "2.0.1",
  },
  {
    date: "26-12-2025",
    title: "Boxing Day Update",
    features: [
      "FIX: movie cover not showing on movie when opened from widget",
    ],
    version: "2.0.11",
  },
] as const;

const getLatestUpdate = () => UPDATE_HISTORY.at(-1);

export const Updates = {
  getLatestUpdate,
};
