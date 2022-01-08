import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";

const firebaseConfig = {
  apiKey: "AIzaSyCt9gvysOlGedJyKfN8hqekBGUfI7PdPX8",
  authDomain: "forum-6b745.firebaseapp.com",
  projectId: "forum-6b745",
  storageBucket: "forum-6b745.appspot.com",
  messagingSenderId: "144517854009",
  appId: "1:144517854009:web:ad208b8ecb50f6430aaee8",
};
const app = initializeApp(firebaseConfig);

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const router = useRouter();

  const onChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    let data;
    if (newAccount) {
      try {
        data = await createUserWithEmailAndPassword(auth, email, password);
        console.log("created new account. user", data);
        router.push(`/`);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      }
    } else {
      try {
        data = await signInWithEmailAndPassword(auth, email, password);
        console.log("signed in user", data);
        router.push(`/`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onToggleChange = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="your id"
          value={email}
          onChange={onChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="your password"
          value={password}
          onChange={onChange}
        ></input>
        {newAccount ? (
          <input type="submit" value="register"></input>
        ) : (
          <input type="submit" value="sign in"></input>
        )}{" "}
      </form>
      <button onClick={onToggleChange}>
        {newAccount ? "Go Sign in" : "Go Sign up"}
      </button>
    </div>
  );
}
