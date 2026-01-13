
export type PhoneCode = {
  code: string;
  country: string;
  emoji: string;
};

export const PHONE_CODES: PhoneCode[] = [
  { code: "+1", country: "United States", emoji: "🇺🇸" },
  { code: "+44", country: "United Kingdom", emoji: "🇬🇧" },
  { code: "+33", country: "France", emoji: "🇫🇷" },
  { code: "+49", country: "Germany", emoji: "🇩🇪" },
  { code: "+81", country: "Japan", emoji: "🇯🇵" },
  { code: "+86", country: "China", emoji: "🇨🇳" },
  { code: "+91", country: "India", emoji: "🇮🇳" },
  { code: "+234", country: "Nigeria", emoji: "🇳🇬" },
];
