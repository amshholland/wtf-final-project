import "./Header.css";

import { signInWithGoogle, signOut } from "../firebaseConfig";
import { useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useHistory } from "react-router-dom";

function Header() {
  const { user } = useContext( AuthContext );
  console.log( user );
  const [ toggle, setToggle ] = useState( "none" );

  function signOutDisplay() {
    if ( toggle === "none" ) {
      setToggle( "flex" );
    } else if ( toggle === "flex" ) {
      setToggle( "none" );
    }
  }

  function gitHubDisplay() {
    if ( toggle === "none" ) {
      setToggle( "flex" );
    } else if ( toggle === "flex" ) {
      setToggle( "none" );
    }
  }

  const history = useHistory();
  const handleClick = () => history.push( '/favorites' );

  return (
    <header className="AppHeader" id="header">
      <div className="TitleDiv">

        <div className="gH">
          <div className="gitHubLogo" onClick={ () => gitHubDisplay() }>
            <img className="logo" src={ process.env.PUBLIC_URL + '/GitHub-Mark-64px.png' } alt="GitHub Links" />
            <div className="headerBtn" style={ { display: toggle } }>
              <a href="https://github.com/dairsmithgit">
                <button className="headerButton">
                  @dairsmithgit
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="TitleDiv">
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
              <div className="headerBtn" style={ { display: toggle } }>
                { user && (
                  <button className="headerButton" onClick={ handleClick }>
                    Favorites
                  </button>
                ) }
              </div>
              <div className="headerBtn" style={ { display: toggle } }>
                { user && (
                  <button className="headerButton" onClick={ signOut }>
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
