"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import Head from "next/head";
import "../styles/globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>Mini User Dashboard</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <html lang="en">
        <body>
          <Provider store={store}>
            <Header />
            {children}
            <ToastContainer position="top-right" autoClose={2000} />
          </Provider>
        </body>
      </html>
    </>
  );
}
