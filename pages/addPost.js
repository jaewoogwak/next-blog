import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "./_app";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function addPost() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");
  const router = useRouter();

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") setTitle(value);
    else if (name === "main") setMainText(value);
  };
  console.log("user info in addPage", user);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("title", title);
    console.log("main text", mainText);
    const newPost = {
      title: title,
      mainText: mainText,
      date: "임시 날짜",
      uid: user.uid,
    };
    try {
      const docRef = await addDoc(collection(db, "post"), {
        title: newPost.title,
        mainText: newPost.mainText,
        date: "임시날짜",
        uid: newPost.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      router.push(`/`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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
      포스트작성하는곳
      <Link href={`/`}>
        <a>Back to Home</a>
      </Link>
      <div className="add-post-zone">
        <form onSubmit={onSubmit}>
          <input
            className="title"
            type="text"
            name="title"
            placeholder="제목"
            value={title}
            onChange={onChange}
          ></input>
          <input
            className="main"
            type="text"
            name="main"
            placeholder="내용"
            value={mainText}
            onChange={onChange}
          ></input>
          <input type="submit" value="작성완료"></input>
        </form>
      </div>
      <style jsx>
        {`
          .add-post-zone {
          }
          form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          input {
            width: 60%;
          }
          .title {
            height: 30px;
          }
          .main {
            height: 300px;
          }
        `}
      </style>
    </div>
  );
}
