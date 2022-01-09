import Link from "next/link";
import { useRouter } from "next/router";
import { doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
import { db } from "../_app";

export default function post() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [id, title, mainText, date, uid] = router.query.params || [];

  console.log(title, mainText, date, id, uid);
  console.log("user info in post detail page", user);
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
  const onDeleteClick = async () => {
    let ok;
    console.log(user.uid, uid);
    if (user.uid === uid) {
      ok = confirm("정말 삭제하시겠습니까?");
      await deleteDoc(doc(db, "post", id));
      router.push(`/`);
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
          <h5>{mainText}</h5>
        </div>
      </div>
    </div>
  );
}
