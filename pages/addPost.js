import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "./_app";
import { storage } from "./_app";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useRouter } from "next/router";

export default function addPost() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");
  const [image, setImage] = useState();
  const [imgName, setImgName] = useState("");
  const router = useRouter();

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") setTitle(value);
    else if (name === "main") setMainText(value);
  };
  console.log("user info in addPage", user);

  const onSubmit = async (event) => {
    event.preventDefault();
    const date = setDate();
    if (image != undefined) {
      const imageRef = ref(storage, `${image.name}`);
      console.log(image);
      console.log("imageRef", imageRef);
      const imageData = await uploadBytes(imageRef, image);
      console.log("imageData", imageData);

      const newPost = {
        title: title,
        mainText: mainText,
        date: date,
        uid: user.uid,
        imgName: image.name,
        // id: Date.now(),
      };
      try {
        const docRef = await addDoc(collection(db, "post"), {
          title: newPost.title,
          mainText: newPost.mainText,
          date: newPost.date,
          uid: newPost.uid,
          imgName: newPost.imgName,
          // id: Date.now(),
        });
        console.log("Document written with ID: ", docRef.id);
        router.push(`/`);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else if (image === undefined) {
      console.log("not image post");
      const newPost = {
        title: title,
        mainText: mainText,
        date: date,
        uid: user.uid,
        imgName: "not.jpg",
        // id: Date.now(),
      };
      try {
        const docRef = await addDoc(collection(db, "post"), {
          title: newPost.title,
          mainText: newPost.mainText,
          date: newPost.date,
          uid: newPost.uid,
          imgName: "",
          // id: Date.now(),
        });
        console.log("Document written with ID: ", docRef.id);
        router.push(`/`);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const onImgChange = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const file = event.target.files[0];
    console.log(file.name);
    // console.log("formdata", formData, event.target.files[0]);
    setImage(file);
    // const imageRef = ref(storage, form)
  };
  const setDate = () => {
    var today = new Date();
    var year = today.getFullYear();
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var day = ("0" + today.getDate()).slice(-2);
    var dateString = year + "-" + month + "-" + day;
    return dateString;
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
            type="file"
            accept="image/*"
            name="file"
            onChange={onImgChange}
          />
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
