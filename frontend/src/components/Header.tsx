import "./Header.css";

import { signInWithGoogle, signOut } from "../firebaseConfig";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

function Header() {
  const { user } = useContext( AuthContext );
  console.log( user );

  return (
    <header className="AppHeader">
      <div className="TitleDiv">
        <img className="logo" src={ process.env.PUBLIC_URL + '/WTF_Truck_Logo.png' } alt="" />
        { user && (
          <div className="GoogleUserPhoto">
            { !!user.photoURL && (
              <img
                src={ user.photoURL }
                alt="google avatar"
                id="profilePic"
              />
            ) }
            { user && (
              <button className="signOut" onClick={ signOut }>
                Sign out
              </button>
            ) }
          </div>
        ) }
      </div>
      <div className="GoogleAuth">
        { !user && (
          <button className="signIn" onClick={ signInWithGoogle }>
            Sign in
          </button>
        ) }
      </div>
    </header>
  );
}

export default Header;
