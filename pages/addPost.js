import Link from "next/link";
import { useState } from "react";
import { db } from "./_app";
import { collection, addDoc } from "firebase/firestore";

export default function addPost() {
  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") setTitle(value);
    else if (name === "main") setMainText(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("title", title);
    console.log("main text", mainText);
    const newPost = {
      title: title,
      mainText: mainText,
      date: "임시 날짜",
    };
    try {
      const docRef = await addDoc(collection(db, "post"), {
        title: newPost.title,
        mainText: newPost.mainText,
        date: "임시날짜",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
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
