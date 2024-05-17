
import Navbar from "../../components/navbar";
import Script from 'next/script'
export default function AppsLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <div className="app-detail pb-12">{children}</div>
          <div className="tab-bar fixed bottom-0 w-full border-t border-solid border-gray-200">
            <Navbar />
          </div>
        </div>
      </body>
      <Script src="/scripts.js"></Script>
    </html>
  );
}
