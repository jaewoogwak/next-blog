import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
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

  return (
    <div className="container">
      <div className="profile zone">profile zone</div>

      <div className="post-zone">
        <h1>Post </h1>
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
