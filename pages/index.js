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
    // {
    //   title: "test title",
    //   date: "2022-01-08",
    //   description: "이 글은 테스트를 위해서 작성되었습니다.",
    //   mainText: "본문",
    //   id: 1,
    //   uid: "",
    // },
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
      // setList((prev) => [...prev, dbPost]);
    });
    setList(tmpList);
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
          <div className="profile-box">
            <img
              className="profile-image"
              src={user.photoURL || "/default.jpg"}
              width={100}
              height={100}
            />
            <h3 className="profile-displayName">
              {user.displayName || "익명의 사용자"}
            </h3>
            <h4 className="profile-email">{user.email}</h4>
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
                  {console.log("post id ", post.id)}
                  <Link
                    href={`/posts/${post.id}/${post.title}/${post.mainText}/${post.date}/${post.uid}/${post.imgName}`}
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
        .profile-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
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
