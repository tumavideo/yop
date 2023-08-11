import "bootstrap/dist/css/bootstrap.css";
import "../styles/modal.css";
import "../styles/theme.css";

import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from "next/app";

import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
