function daysAgo(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "--";
  }

  const now = new Date();

  // Difference in milliseconds
  const diffMs = now.getTime() - date.getTime();

  // Future date
  if (diffMs < 0) return "in the future";

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const days = Math.floor(diffMs / MS_PER_DAY);

  if (days === 0) return "today";
  if (days === 1) return "yesterday";

  return `${days} days ago`;
}

export const DateFunctions = {
  daysAgo,
};
