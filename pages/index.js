import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState();
  const [list, setList] = useState([
    {
      title: "test title",
      date: "2022-01-08",
      description: "이 글은 테스트를 위해서 작성되었습니다.",
      id: 1,
    },
    {
      title: "test title",
      date: "2022-01-08",
      description: "이 글은 테스트를 위해서 작성되었습니다.",
      id: 2,
    },
    {
      title: "test title",
      date: "2022-01-08",
      description: "이 글은 테스트를 위해서 작성되었습니다.",
      id: 3,
    },
    {
      title: "test title",
      date: "2022-01-08",
      description: "이 글은 테스트를 위해서 작성되었습니다.",
      id: 4,
    },
  ]);

  const userSignOut = () => {
    const auth = getAuth();
    // console.log(auth)
    signOut(auth)
      .then(() => {
        console.log("sign out");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
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
  });
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
            <button>add post</button>
            <div className="post-list">
              {list.map((post) => (
                <div className="post" key={post.id}>
                  <Link href={`/posts/${post.id}`}>
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
