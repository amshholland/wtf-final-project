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
      </div>
      <div className="GoogleAuth">
        {user && (
          <div className="GoogleUserPhoto">
            {!!user.photoURL && (
              <img src={user.photoURL} alt="google profile picture"></img>
            )}
            </div>
            )}
        {!user && (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
        {user && <button onClick={signOut}>Sign out</button>}
      </div>
    </header>
  );
}

export default Header;
