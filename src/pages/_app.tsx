import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { SWRConfig } from "swr";

declare global {
  interface Window {
    fbAsyncInit: () => any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}>
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="lazyOnload" /> {/** beforeInteractive, afterInteractive(default), lazyOnload */}
      <Script src="https://connect.facebook.net/en_US/sdk.js" onLoad={() => {
        window.fbAsyncInit = function() {
          // const FB: any = {};
          // FB.init({
          //   appId: "your-app-id",
          //   autoLogAppEvents: true,
          //   xfbml: true,
          //   version: "v13.0"
          // })
        }
      }} />
    </SWRConfig>
  );
}
