
import Script from 'next/script'
export default function AppLandingLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
      {children}
      </body>
      <Script src="/scripts.js"></Script>
    </html>
  );
}
