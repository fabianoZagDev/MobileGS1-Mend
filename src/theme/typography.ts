import { fonts } from './fonts';

export const typography = {
  h1: { fontSize: 30, fontFamily: fonts.title, letterSpacing: -0.5 },
  h2: { fontSize: 23, fontFamily: fonts.title, letterSpacing: -0.3 },
  h3: { fontSize: 18, fontFamily: fonts.titleSemi },
  h4: { fontSize: 15, fontFamily: fonts.titleSemi },
  body: { fontSize: 14, fontFamily: fonts.body },
  bodyMedium: { fontSize: 14, fontFamily: fonts.bodyMedium },
  bodySmall: { fontSize: 12, fontFamily: fonts.body },
  caption: { fontSize: 11, fontFamily: fonts.body },
  label: { fontSize: 10, fontFamily: fonts.bodyMedium, letterSpacing: 1.4 },
  mono: { fontSize: 12, fontFamily: fonts.body },
};
