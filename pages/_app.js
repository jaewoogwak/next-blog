import Head from "next/head";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <NavBar />
      <Head>
        <title>jaewoogwak.log</title>
      </Head>
      <Component {...pageProps} />

      {/* <Footer /> */}
    </div>
  );
}
