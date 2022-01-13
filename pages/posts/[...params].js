import Link from "next/link";
import { useRouter } from "next/router";
import { doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../_app";
import React, { Component } from "react";

export default function post() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [id, title, mainText, date, uid, imgName] = router.query.params || [];
  const [image, setImage] = useState("");
  const downloadImg = async () => {
    console.log("imgName", imgName);
    const a = "right.png";
    if (imgName != undefined) {
      const url = await getDownloadURL(ref(storage, imgName));
      console.log("image URL", url);
      setImage(url);
    }
  };
  console.log("user info in post detail page", user);
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
  }, [imgName]);

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

  const onEditClick = () => {};

  return (
    <div>
      <Link href={`/`}>
        <a>Back to Home</a>
      </Link>
      <div>
        post detail
        <div>
          <span>
            <button onClick={onDeleteClick}>삭제</button>
            <button>수정</button>
          </span>
          <h2>{title}</h2>
          <h4>{date}</h4>
          <h5>{imgName}</h5>
          <img src={image} alt="image" width={50} height={50} />
          <h5>{mainText}</h5>
        </div>
      </div>
    </div>
  );
}
