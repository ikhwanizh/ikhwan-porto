import { ScrollViewStyleReset, useServerDocumentContext } from 'expo-router/html';
import type { PropsWithChildren } from 'react';
import { paletteCss, palettes } from '@/theme/tokens';

const styles = `
  :root { color-scheme: light dark; ${paletteCss(palettes.light)} }
  @media (prefers-color-scheme: dark) { :root { ${paletteCss(palettes.dark)} } }
  body { background: var(--portfolio-bg); }
  #portfolio-cover { image-rendering: pixelated; }
  div[data-project-gallery] { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); }
  :focus-visible { outline: 2px solid var(--portfolio-accent); outline-offset: 3px; }
`;

/** Root HTML for the static export. Web-only; runs in Node at build time. */
export default function Root({ children }: PropsWithChildren) {
  const { headNodes, bodyNodes, htmlAttributes, bodyAttributes } = useServerDocumentContext();
  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content={palettes.light.bg} />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content={palettes.dark.bg} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}
