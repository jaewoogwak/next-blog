import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";

function test({ post }) {
  console.log("data", post);
  const [posts, setPosts] = useState(post);
  console.log("posts", posts);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          {post.mainText}
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const db = getFirestore();
  let list = [];
  const querySnapshot = await getDocs(collection(db, "post"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().email}`);
    list.push(doc.data());
  });

  return {
    props: {
      post: list,
    },
  };
}

export default test;
