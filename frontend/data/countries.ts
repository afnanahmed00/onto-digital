export type Country = {
  /** ISO 3166-1 alpha-2 code, e.g. "IN". */
  iso2: string;
  name: string;
  /** International dialing code, without the leading "+". */
  dialCode: string;
  /** Flag emoji shown next to the dial code in the selector. */
  flag: string;
  /** Reasonable local (national significant number) digit-length range, used for validation. */
  phoneLength: { min: number; max: number };
};

// A practical list of commonly used countries rather than the full ISO list —
// covers ONTO DIGITAL's primary market (India) plus the regions its clients
// most often reach out from. Avoids pulling in a phone-number library.
export const COUNTRIES: Country[] = [
  { iso2: "IN", name: "India", dialCode: "91", flag: "🇮🇳", phoneLength: { min: 10, max: 10 } },
  { iso2: "US", name: "United States", dialCode: "1", flag: "🇺🇸", phoneLength: { min: 10, max: 10 } },
  { iso2: "CA", name: "Canada", dialCode: "1", flag: "🇨🇦", phoneLength: { min: 10, max: 10 } },
  { iso2: "GB", name: "United Kingdom", dialCode: "44", flag: "🇬🇧", phoneLength: { min: 9, max: 10 } },
  { iso2: "AU", name: "Australia", dialCode: "61", flag: "🇦🇺", phoneLength: { min: 9, max: 9 } },
  { iso2: "NZ", name: "New Zealand", dialCode: "64", flag: "🇳🇿", phoneLength: { min: 8, max: 9 } },
  { iso2: "DE", name: "Germany", dialCode: "49", flag: "🇩🇪", phoneLength: { min: 6, max: 11 } },
  { iso2: "FR", name: "France", dialCode: "33", flag: "🇫🇷", phoneLength: { min: 9, max: 9 } },
  { iso2: "ES", name: "Spain", dialCode: "34", flag: "🇪🇸", phoneLength: { min: 9, max: 9 } },
  { iso2: "IT", name: "Italy", dialCode: "39", flag: "🇮🇹", phoneLength: { min: 6, max: 11 } },
  { iso2: "NL", name: "Netherlands", dialCode: "31", flag: "🇳🇱", phoneLength: { min: 9, max: 9 } },
  { iso2: "BE", name: "Belgium", dialCode: "32", flag: "🇧🇪", phoneLength: { min: 8, max: 9 } },
  { iso2: "CH", name: "Switzerland", dialCode: "41", flag: "🇨🇭", phoneLength: { min: 9, max: 9 } },
  { iso2: "IE", name: "Ireland", dialCode: "353", flag: "🇮🇪", phoneLength: { min: 7, max: 9 } },
  { iso2: "PT", name: "Portugal", dialCode: "351", flag: "🇵🇹", phoneLength: { min: 9, max: 9 } },
  { iso2: "SE", name: "Sweden", dialCode: "46", flag: "🇸🇪", phoneLength: { min: 7, max: 9 } },
  { iso2: "NO", name: "Norway", dialCode: "47", flag: "🇳🇴", phoneLength: { min: 8, max: 8 } },
  { iso2: "DK", name: "Denmark", dialCode: "45", flag: "🇩🇰", phoneLength: { min: 8, max: 8 } },
  { iso2: "PL", name: "Poland", dialCode: "48", flag: "🇵🇱", phoneLength: { min: 9, max: 9 } },
  { iso2: "AE", name: "United Arab Emirates", dialCode: "971", flag: "🇦🇪", phoneLength: { min: 9, max: 9 } },
  { iso2: "SA", name: "Saudi Arabia", dialCode: "966", flag: "🇸🇦", phoneLength: { min: 9, max: 9 } },
  { iso2: "QA", name: "Qatar", dialCode: "974", flag: "🇶🇦", phoneLength: { min: 8, max: 8 } },
  { iso2: "KW", name: "Kuwait", dialCode: "965", flag: "🇰🇼", phoneLength: { min: 8, max: 8 } },
  { iso2: "IL", name: "Israel", dialCode: "972", flag: "🇮🇱", phoneLength: { min: 9, max: 9 } },
  { iso2: "TR", name: "Turkey", dialCode: "90", flag: "🇹🇷", phoneLength: { min: 10, max: 10 } },
  { iso2: "PK", name: "Pakistan", dialCode: "92", flag: "🇵🇰", phoneLength: { min: 10, max: 10 } },
  { iso2: "BD", name: "Bangladesh", dialCode: "880", flag: "🇧🇩", phoneLength: { min: 10, max: 10 } },
  { iso2: "LK", name: "Sri Lanka", dialCode: "94", flag: "🇱🇰", phoneLength: { min: 9, max: 9 } },
  { iso2: "NP", name: "Nepal", dialCode: "977", flag: "🇳🇵", phoneLength: { min: 10, max: 10 } },
  { iso2: "SG", name: "Singapore", dialCode: "65", flag: "🇸🇬", phoneLength: { min: 8, max: 8 } },
  { iso2: "MY", name: "Malaysia", dialCode: "60", flag: "🇲🇾", phoneLength: { min: 9, max: 10 } },
  { iso2: "ID", name: "Indonesia", dialCode: "62", flag: "🇮🇩", phoneLength: { min: 9, max: 12 } },
  { iso2: "TH", name: "Thailand", dialCode: "66", flag: "🇹🇭", phoneLength: { min: 9, max: 9 } },
  { iso2: "VN", name: "Vietnam", dialCode: "84", flag: "🇻🇳", phoneLength: { min: 9, max: 10 } },
  { iso2: "PH", name: "Philippines", dialCode: "63", flag: "🇵🇭", phoneLength: { min: 10, max: 10 } },
  { iso2: "CN", name: "China", dialCode: "86", flag: "🇨🇳", phoneLength: { min: 11, max: 11 } },
  { iso2: "JP", name: "Japan", dialCode: "81", flag: "🇯🇵", phoneLength: { min: 10, max: 10 } },
  { iso2: "KR", name: "South Korea", dialCode: "82", flag: "🇰🇷", phoneLength: { min: 9, max: 10 } },
  { iso2: "ZA", name: "South Africa", dialCode: "27", flag: "🇿🇦", phoneLength: { min: 9, max: 9 } },
  { iso2: "NG", name: "Nigeria", dialCode: "234", flag: "🇳🇬", phoneLength: { min: 10, max: 10 } },
  { iso2: "KE", name: "Kenya", dialCode: "254", flag: "🇰🇪", phoneLength: { min: 9, max: 9 } },
  { iso2: "EG", name: "Egypt", dialCode: "20", flag: "🇪🇬", phoneLength: { min: 10, max: 10 } },
  { iso2: "BR", name: "Brazil", dialCode: "55", flag: "🇧🇷", phoneLength: { min: 10, max: 11 } },
  { iso2: "MX", name: "Mexico", dialCode: "52", flag: "🇲🇽", phoneLength: { min: 10, max: 10 } },
  { iso2: "AR", name: "Argentina", dialCode: "54", flag: "🇦🇷", phoneLength: { min: 10, max: 11 } },
  { iso2: "CO", name: "Colombia", dialCode: "57", flag: "🇨🇴", phoneLength: { min: 10, max: 10 } },
  { iso2: "RU", name: "Russia", dialCode: "7", flag: "🇷🇺", phoneLength: { min: 10, max: 10 } },
];

// India is ONTO DIGITAL's home market — the phone selector defaults to it.
export const DEFAULT_COUNTRY: Country =
  COUNTRIES.find((country) => country.iso2 === "IN") ?? COUNTRIES[0];
