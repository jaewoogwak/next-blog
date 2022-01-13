import Link from "next/link";
import { useRouter } from "next/router";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../_app";
import React, { Component } from "react";

export default function post() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [id, title, mainText, date, uid, imgName] = router.query.params || [];
  const [image, setImage] = useState("");
  const [editing, setEditing] = useState(false);
  const [edit_title, set_Edit_title] = useState("");
  const [edit_mainText, set_Edit_mainText] = useState("");
  const [edit_img, set_Edit_img] = useState("");

  useEffect(async () => {
    const auth = getAuth();
    console.log("auth", auth);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        setUser(user);
        console.log("imgggggggName", mainText, imgName);
      } else {
      }
    });
    downloadImg();
    editValue();
  }, [imgName]);

  const downloadImg = async () => {
    console.log("imgName", imgName);
    if (imgName != undefined) {
      const url = await getDownloadURL(ref(storage, imgName));
      console.log("image URL", url);
      setImage(url);
    }
  };

  const onDeleteClick = async () => {
    let ok;
    console.log(user.uid, uid);
    if (user.uid === uid) {
      ok = confirm("정말 삭제하시겠습니까?");
      if (ok) {
        await deleteDoc(doc(db, "post", id));
        router.push(`/`);
      }
    } else {
      alert("권한이 없습니다");
    }
  };

  const onEditToggle = () => {
    setEditing((prev) => !prev);
  };
  const onEditChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      set_Edit_title(value);
    } else if (name === "main") {
      set_Edit_mainText(value);
    }
    console.log(edit_title, edit_mainText);
  };

  const onEditSubmit = async (event) => {
    event.preventDefault();

    const updateRef = doc(db, "post", id);
    const updatePost = {
      title: edit_title,
      mainText: edit_mainText,
    };
    await updateDoc(updateRef, {
      title: edit_title,
      mainText: edit_mainText,
    });
    router.push("/");
    setEditing(false);
  };
  const editValue = () => {
    set_Edit_title(title);
    set_Edit_mainText(mainText);
  };
  return (
    <div>
      <Link href={`/`}>
        <a>Back to Home</a>
      </Link>
      {editing ? (
        <div>
          수정중...
          <button onClick={onEditToggle}>
            {editing ? "수정취소" : "수정"}
          </button>
          <form onSubmit={onEditSubmit}>
            <input
              className="title"
              type="text"
              name="title"
              placeholder="제목"
              value={edit_title}
              onChange={onEditChange}
            ></input>
            {/* <input type="file" accept="image/*" name="file" value=""/> */}
            <input
              className="main"
              type="text"
              name="main"
              placeholder="내용"
              value={edit_mainText}
              onChange={onEditChange}
            ></input>
            <input type="submit" value="수정완료"></input>
          </form>
        </div>
      ) : (
        <div>
          post detail
          <div>
            <span>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={onEditToggle}>수정</button>
            </span>
            <h2>{title}</h2>
            <h4>{date}</h4>
            <h5>{imgName}</h5>
            <img src={image} alt="image" width={50} height={50} />
            <h5>{mainText}</h5>
          </div>
        </div>
      )}
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
