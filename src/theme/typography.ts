import { fonts } from './fonts';

export const typography = {
  // Títulos — Space Grotesk (alt. TWK Everett)
  h1: { fontSize: 30, fontFamily: fonts.title, letterSpacing: -0.5 },
  h2: { fontSize: 23, fontFamily: fonts.title, letterSpacing: -0.3 },
  h3: { fontSize: 18, fontFamily: fonts.titleSemi },
  h4: { fontSize: 15, fontFamily: fonts.titleSemi },

  // Corpo — Roboto
  body: { fontSize: 14, fontFamily: fonts.body },
  bodyMedium: { fontSize: 14, fontFamily: fonts.bodyMedium },
  bodySmall: { fontSize: 12, fontFamily: fonts.body },
  caption: { fontSize: 11, fontFamily: fonts.body },

  // Labels técnicos / leituras de telemetria — JetBrains Mono (cara de painel HUD)
  label: { fontSize: 10, fontFamily: fonts.mono, letterSpacing: 1.5 },
  mono: { fontSize: 12, fontFamily: fonts.mono, letterSpacing: 0.3 },
  monoSmall: { fontSize: 11, fontFamily: fonts.mono, letterSpacing: 0.2 },
  monoMedium: { fontSize: 12, fontFamily: fonts.monoMedium, letterSpacing: 0.3 },
  monoLarge: { fontSize: 22, fontFamily: fonts.monoBold, letterSpacing: -0.4 },
};
