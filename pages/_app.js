import Head from "next/head";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import { API_KEY } from "../key";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "forum-6b745.firebaseapp.com",
  projectId: "forum-6b745",
  // databaseURL:
  //   // "https://forum-6b745-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "forum-6b745.appspot.com",
  messagingSenderId: "144517854009",
  appId: "1:144517854009:web:ad208b8ecb50f6430aaee8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);

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

  const readData = async () => {
    console.log("read data");
    const querySnapshot = await getDocs(collection(db, "post"));
    let tmpList = [];

    querySnapshot.forEach((doc) => {
      // console.log(`data : ${doc.id} => ${doc.data().title}`);
      const dbPost = {
        title: doc.data().title,
        mainText: doc.data().mainText,
        date: doc.data().date,
        id: doc.id,
        uid: doc.data().uid,
        imgName: doc.data().imgName,
      };
      console.log(dbPost);
      tmpList.push(dbPost);
    });
    setList(tmpList);
  };

  return (
    <div>
      {user ? <NavBar /> : null}
      <Head>
        <title>jaewoogwak.log</title>
      </Head>
      <Component userInfo={user} postList={list} />

      {/* <Footer /> */}
    </div>
  );
}

export { db };
export { storage };
