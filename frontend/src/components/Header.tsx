import "./Header.css";

import { signInWithGoogle, signOut } from "../firebaseConfig";
import { useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useHistory } from "react-router-dom";

function Header() {
  const { user } = useContext( AuthContext );
  console.log( user );
  const [ signOutToggle, setSignOutToggle ] = useState( "none" );
  const [ ghToggle, setGhToggle ] = useState( "none" );

  function signOutDisplay() {
    if ( signOutToggle === "none" ) {
      setSignOutToggle( "flex" );
    } else if ( signOutToggle === "flex" ) {
      setSignOutToggle( "none" );
    }
  }

  function gitHubDisplay() {
    if ( ghToggle === "none" ) {
      setGhToggle( "flex" );
    } else if ( ghToggle === "flex" ) {
      setGhToggle( "none" );
    }
  }

  const history = useHistory();
  const handleClick = () => history.push( '/favorites' );

  return (
    <header className="AppHeader" id="header">
        <div className="gH">
          <div className="gitHubLogo" onClick={ () => gitHubDisplay() }>
            <img className="gHLogo" src={ process.env.PUBLIC_URL + '/GitHub-Mark-64px.png' } alt="GitHub Links" />
          </div>
          <div className="headerBtn" style={ { display: ghToggle } }>
            <a href="https://github.com/amshholland">
              <button className="headerButton">
                Amber Holland
              </button>
            </a>
            <a href="https://github.com/dairsmithgit">
              <button className="headerButton">
                Dair Smith
              </button>
            </a>
            <a href="https://github.com/PatrickHumphries">
              <button className="headerButton">
                Patrick Humphries
              </button>
            </a>
          </div>
        </div>
        <div className="TitleDiv">
        <div className="logoDiv">
          <a href="/">
            <img className="logo" src={ process.env.PUBLIC_URL + '/WTF_Truck_Logo.png' } alt="WTF Truck Logo" />
          </a>

          { user && (
            <div className="GoogleUserPhoto">
              <div className="userPhoto" onClick={ () => signOutDisplay() }>
                { !!user.photoURL && (
                  <img src={ user.photoURL } alt="google avatar" id="profilePic" />
                ) }
              </div>
              <div className="headerBtn" style={ { display: signOutToggle } }>
                { user && (
                  <button className="headerButton" onClick={ handleClick }>
                    Favorites
                  </button>
                ) }
              </div>
              <div className="headerBtn" style={ { display: signOutToggle } }>
                { user && (
                  <button className="headerButton" id="signOut" onClick={ signOut }>
                    Sign out
                  </button>
                ) }
              </div>
            </div>
          ) }
        </div>
        <div className="GoogleAuth">
          { !user && (
            <button className="headerButton" onClick={ signInWithGoogle }>
              Sign in
            </button>
          ) }
        </div>
      </div>
    </header >
  );
}

export default Header;
