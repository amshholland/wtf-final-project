import { useContext, useState } from "react";
import { ToggleButton } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";

function Header() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [ toggle, setToggle ] = useState("none")

  function signOutDisplay() {
    if (toggle === "none") {
      setToggle("flex");
    } else if (toggle ==="flex") {
      setToggle("none");
    }
  }

  return (
    <header className="AppHeader">
      <div className="TitleDiv">
        <img className="logo" src={ process.env.PUBLIC_URL + '/WTF_Truck_Logo.png' } alt="" />
        {/* <h1>WTF</h1> */}
        
        {user && (
          <div className="GoogleUserPhoto">
            <div className="userPhoto" onClick={() => signOutDisplay()}>
              {!!user.photoURL && (
                <img src={user.photoURL} alt="google avatar" id="profilePic" />
              )}
            </div>
            <div className="signOutBtn" style={{display: toggle}}>
              {user && (
                <button className="signOut" onClick={signOut}>
                  Sign out
                </button>
              )}
            </div>
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
