import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";

export default function Profile({ user }) {
  console.log("userrrrrr", user);
  const auth = getAuth();
  const [user, setUser] = useState();
  const [displayName, setDisplayName] = useState("");
  const [profileEditing, setProfileEditing] = useState(false);
  console.log(user);

  //   const [email, setEmail] = useState("");
  //   const [photoURL, setPhotoURL] = useState("");

  //   const setProfile = () => {
  //     setDisplayName(user.displayName);
  //     setEmail(user.email);
  //     setPhotoURL(user.photoURL);
  //   };
  const onProfileUpdate = async () => {
    setProfileEditing(true);
    // await updateProfile(auth.currentUser, {
    //   displayName: "jaewoogwak",
    //   photoURL: "https://example.com/jane-q-user/profile.jpg",
    // });
  };
  const onProfileEditToggle = () => {
    setProfileEditing((prev) => !prev);
  };

  // useEffect(() => {
  //   // setUser(userInfo);
  //   // setProfile();
  //   setUser(userInfo);
  //   if (user != null) {
  //     setDisplayName(user.displayName);
  //   }
  // }, [userInfo, displayName]);

  return (
    <div>
      profile
      <p>user Info</p>
      <button onClick={onProfileEditToggle}>
        {profileEditing ? "프로필 수정 취소" : "프로필 수정"}
      </button>
      {profileEditing ? (
        <div>
          수정중..
          <button onClick={onProfileUpdate}>profile update</button>
          <div></div>
        </div>
      ) : (
        <div>
          <div>
            <img src="" />
            {user && (
              <div>
                <h1>{displayName}</h1>
                <h2>{user.email}</h2>{" "}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// export async function getStaticProps() {

//   return {
//     props: {
//       user: user,
//     },
//   };
// }
