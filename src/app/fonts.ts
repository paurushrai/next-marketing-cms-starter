import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Font roles, loaded and self-hosted by next/font (zero layout shift).
 * Each exposes a CSS variable consumed by the token bridge in globals.css.
 * Swap a face here to re-type the whole app — components never name a font.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-var",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-var",
  display: "swap",
});
