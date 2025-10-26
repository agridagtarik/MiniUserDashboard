"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import Head from "next/head";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>MiniUserDashboard</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <html lang="en">
        <body>
          <Provider store={store}>{children}</Provider>
        </body>
      </html>
    </>
  );
}
