import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";

function Header() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <header className="AppHeader">
      <div className="TitleDiv">
        <img className="logo" src="logo-placeholder-png.png" alt="" />
        {user && (
          <div className="GoogleUserPhoto">
            {!!user.photoURL && (
              <img
                src={user.photoURL}
                alt="google avatar"
                id="profilePic"
              />
            )}
            {user && (
              <button className="signOut" onClick={signOut}>
                Sign out
              </button>
            )}
          </div>
        )}
      </div>
      <div className="GoogleAuth">
        {!user && (
          <button className="signIn" onClick={signInWithGoogle}>
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
