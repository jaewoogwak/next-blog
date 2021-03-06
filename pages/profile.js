import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import LoginView from "../components/LoginView";
import Link from "next/link";
export default function Profile({ userInfo }) {
  console.log("userrrrrr", userInfo);
  const auth = getAuth();
  const [user, setUser] = useState(userInfo);
  const [displayName, setDisplayName] = useState();
  const [profileEditing, setProfileEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  console.log("userInfo", user);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "nickname") {
      setNickname(value);
    }
  };

  const onProfileUpdate = async () => {
    setProfileEditing(true);
    await updateProfile(auth.currentUser, {
      displayName: nickname,
      // photoURL: "https://example.com/jane-q-user/profile.jpg",
    });
  };
  const onProfileEditToggle = () => {
    setProfileEditing((prev) => !prev);
  };

  useEffect(() => {
    setUser(userInfo);
    if (user != null) {
      setDisplayName(user.displayName);
    }
  }, [userInfo, displayName]);

  console.log("displayname", displayName);
  return (
    <div>
      {user ? (
        <div>
          <p>user Info</p>
          <button onClick={onProfileEditToggle}>
            {profileEditing ? "프로필 수정 취소" : "프로필 수정"}
          </button>
          {profileEditing ? (
            <div>
              수정중..
              <div className="edit-box">
                <input
                  className="edit-displayName"
                  type="text"
                  name="nickname"
                  placeholder="닉네임 변경"
                  value={nickname}
                  onChange={onChange}
                ></input>

                <input
                  className="edit-profileImage"
                  type="file"
                  name="image"
                ></input>
                <button
                  className="profile-update-button"
                  onClick={onProfileUpdate}
                >
                  profile update
                </button>
              </div>
            </div>
          ) : (
            <div>
              {user && (
                <div className="profile-box">
                  <img
                    className="profile-image"
                    src={user.photoURL || "/default.jpg"}
                    width={100}
                    height={100}
                  />
                  <h3 className="profile-displayName">
                    {displayName || "익명의 사용자"}
                  </h3>
                  <h4 className="profile-email">{user.email}</h4>{" "}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          <>Not Logged In</>
          <Link href="/login">
            <a>Go Sign In</a>
          </Link>
        </>
      )}

      <style jsx>
        {`
          .profile-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          .profile-image {
          }
          .profile-displayName {
          }
          .edit-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
          }
          .edit-displayName {
            width: 400px;
          }
          .edit-profileImage {
            width: 200px;
          }
          .profile-update-button {
            width: 400px;
          }
        `}
      </style>
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
