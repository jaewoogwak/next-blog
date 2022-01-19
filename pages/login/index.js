import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useRouter } from "next/router";

export default function login() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const router = useRouter();

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "nickname") {
      setNickname(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    let data;
    if (newAccount) {
      try {
        data = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName: nickname,
          photoURL: "/default.jpg",
        });
        console.log("created new account. user", data);
        router.push(`/`);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setError(`${errorCode}, ${errorMessage}`);
      }
    } else {
      try {
        data = await signInWithEmailAndPassword(auth, email, password);
        console.log("signed in user", data);
        router.push(`/`);
      } catch (error) {
        setError(`${errorCode}, ${errorMessage}`);
      }
    }
  };
  const onToggleChange = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <div className="container">
      <h1>jaewoo.world</h1>
      {newAccount ? (
        <form className="login-form" onSubmit={onSubmit}>
          <input
            className="login-nickname"
            type="text"
            name="nickname"
            placeholder="Nickname"
            value={nickname}
            onChange={onChange}
            required
          ></input>
          <input
            className="login-id"
            type="email"
            name="email"
            placeholder="your id"
            value={email}
            onChange={onChange}
            required
          ></input>
          <input
            className="login-password"
            type="password"
            name="password"
            placeholder="your password"
            value={password}
            onChange={onChange}
            required
          ></input>
          <input
            className="login-button"
            type="submit"
            value={newAccount ? "Regitser" : "Sign in"}
          ></input>
        </form>
      ) : (
        <form className="login-form" onSubmit={onSubmit}>
          <input
            className="login-id"
            type="email"
            name="email"
            placeholder="your id"
            value={email}
            onChange={onChange}
            required
          ></input>
          <input
            className="login-password"
            type="password"
            name="password"
            placeholder="your password"
            value={password}
            onChange={onChange}
            required
          ></input>
          <input
            className="login-button"
            type="submit"
            value={newAccount ? "Regitser" : "Sign in"}
          ></input>
        </form>
      )}

      <button className="login-toggle" onClick={onToggleChange}>
        {newAccount ? "Go Sign in" : "Go Sign up"}
      </button>
      <p>{error}</p>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          margin-top: 70px;
        }

        .login-form {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 300px;
        }
        .login-nickname {
          height: 20px;
        }
        .login-id {
          height: 20px;
        }
        .login-password {
          height: 20px;
        }
        .login-toggle {
          width: 300px;
        }
      `}</style>
    </div>
  );
}
