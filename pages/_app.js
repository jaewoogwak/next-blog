import Head from "next/head";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCt9gvysOlGedJyKfN8hqekBGUfI7PdPX8",
  authDomain: "forum-6b745.firebaseapp.com",
  projectId: "forum-6b745",
  storageBucket: "forum-6b745.appspot.com",
  messagingSenderId: "144517854009",
  appId: "1:144517854009:web:ad208b8ecb50f6430aaee8",
};
const app = initializeApp(firebaseConfig);

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  console.log("user info in app start", user);
  useEffect(async () => {
    const auth = getAuth();
    console.log("auth", auth);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        setUser(user);
        // ...
      } else {
      }
    });
  }, []);
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

export const db = getFirestore();
