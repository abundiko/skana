export function buildUrlQuery(obj: { [key: string]: any } | undefined) {
  if (!obj) return "";
  const query = Object.entries(obj)
    .filter(([, value]) => value !== "") // Remove entries with empty string values
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return query ? "?" + query : "";
}

export function pickRandomArrayItem<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function fullName(...names: (string | undefined)[]) {
  return names
    .filter((i) => i !== undefined)
    .map((i) => `${i.charAt(0).toUpperCase()}${i.slice(1)}`)
    .join(" ");
}

export function getMostRecurringItem<T extends string | number>(array: T[]): T {
  const counts: Record<string | number, number> = {};
  let maxCount = 0;
  let mostRecurring = array[0];

  for (const item of array) {
    counts[item] = (counts[item] || 0) + 1;
    if (counts[item] > maxCount) {
      maxCount = counts[item];
      mostRecurring = item;
    }
  }

  return mostRecurring;
}

export function removeNullishValues(obj: any) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value !== null && value !== undefined)
      .map(([key, value]) => [key, value])
  );
}

export function sleep(s:number){
  return new Promise(resolve=>setTimeout(resolve,s*1000))
}