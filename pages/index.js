import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./_app";
export default function Home() {
  const [user, setUser] = useState(null);
  const route = useRouter();
  const [list, setList] = useState([
    {
      title: "test title",
      date: "2022-01-08",
      description: "이 글은 테스트를 위해서 작성되었습니다.",
      mainText: "본문",
      id: 1,
      uid: "",
    },
  ]);

  const userSignOut = () => {
    const auth = getAuth();
    // console.log(auth)
    signOut(auth)
      .then(() => {
        console.log("sign out");
        // Sign-out successful.
        setUser(null);
        route.push(`/login`);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const readData = async () => {
    console.log("read data");
    const querySnapshot = await getDocs(collection(db, "post"));
    querySnapshot.forEach((doc) => {
      // console.log(`data : ${doc.id} => ${doc.data().title}`);
      const dbPost = {
        title: doc.data().title,
        mainText: doc.data().mainText,
        date: doc.data().date,
        id: doc.id,
        uid: doc.data().uid,
      };
      console.log(dbPost);
      setList((prev) => [...prev, dbPost]);
    });
  };

  useEffect(async () => {
    const auth = getAuth();
    console.log("auth", auth);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        console.log(user);
        setUser(user);
        // ...
      } else {
      }
    });
    readData();
  }, []);
  return (
    <div>
      {user ? (
        <div className="container">
          <div className="profile zone">
            {user.email}
            <button onClick={userSignOut}>Sign out</button>
          </div>

          <div className="post-zone">
            <h1>Post </h1>
            <Link href={`/addPost`}>
              <a>
                <button>add post</button>
              </a>
            </Link>

            <div className="post-list">
              {list.map((post) => (
                <div className="post" key={post.id}>
                  <Link
                    href={`/posts/${post.id}/${post.title}/${post.mainText}/${post.date}/${post.uid}`}
                  >
                    <a>
                      <h2>{post.title}</h2>
                    </a>
                  </Link>
                  <h4>{post.date}</h4>
                  <h5>{post.description}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>Not Logged in</>
      )}
      <style jsx>{`
        .container {
          display: flex;
        }
        .profile {
          flex: 1;
        }
        .post-zone {
          flex: 4;
        }
        .post {
          border-bottom: solid 1px grey;
        }
        a {
          color: black;
          text-decoration: none;
        }
        h2 {
          font-size: 30px;
        }
        h4 {
          margin-top: -20px;
          color: grey;
        }
        h5 {
          margin-top: -10px;
        }
      `}</style>
    </div>
  );
}
