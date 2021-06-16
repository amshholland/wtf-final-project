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
        <h1>Where's The Food Trucks?</h1>
      </div>
      <div className="GoogleAuth">
        {!user && (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
        {user && <button onClick={signOut}>Sign out</button>}
        {user && (
          <div className="GoogleUserPhoto">
            {!!user.photoURL && (
              <img src={user.photoURL} alt="google profile picture"></img>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
