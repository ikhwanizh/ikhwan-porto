import { Platform, useColorScheme } from 'react-native';

export const palettes = {
  light: {
    bg: '#ffffff',
    surface: '#ffffff',
    text: '#37352f',
    muted: '#625f57',
    accent: '#245b85',
    tint: '#f4f3f0',
    border: '#e7e5e0',
    cardBorder: '#d9d7d1',
    cover: '#f4f5f7',
  },
  dark: {
    bg: '#191919',
    surface: '#222222',
    text: '#f3f3f3',
    muted: '#c9c9c9',
    accent: '#a3c2e2',
    tint: '#2a2a2a',
    border: '#3d3d3d',
    cardBorder: '#474747',
    cover: '#111111',
  },
};

type Palette = typeof palettes.light;

const webColors = Object.fromEntries(
  Object.keys(palettes.light).map((key) => [key, `var(--portfolio-${key})`]),
) as Palette;

export function paletteCss(palette: Palette) {
  return Object.entries(palette).map(([key, value]) => `--portfolio-${key}:${value};`).join('');
}

export function useColors() {
  const scheme = useColorScheme();
  return Platform.OS === 'web' ? webColors : palettes[scheme === 'dark' ? 'dark' : 'light'];
}

export const fontFamily = Platform.select({
  web: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
  default: undefined,
});
