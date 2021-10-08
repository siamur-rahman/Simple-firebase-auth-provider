
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";

import { useState } from "react";

import './App.css';
import inializeAuthentication from './firebase/firebase.initialize';

inializeAuthentication();


//providers.......
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


function App() {
  const [user, setUser] = useState({});

  const auth = getAuth();


  //GOOGLE HANDLE
  const handleGoogleSignIn = () => {
    // const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const logInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(logInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  //GITHUB HANDLE
  const handleGithubSignIn = () => {
    // const auth = getAuth();
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        // const user = result.user;
        // console.log(user);
        const { displayName, photoURL } = result.user;
        const logInUser = {
          name: displayName,
          //   email: email,
          photo: photoURL
        };
        setUser(logInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  //SIGN OUT HALDLE
  const handleSignOutAuth = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }



  return (
    <div className="App">

      {!user.name ?
        <div>
          <h3>Please Log In With</h3>
          <button onClick={handleGoogleSignIn}>google Sign in</button>
          <button onClick={handleGithubSignIn}>GitHub Sign in</button>
        </div> :
        <div>
          <p>Sign Out From {user.name}</p>
          <button onClick={handleSignOutAuth}>Sign Out</button>
        </div>}

      {
        user.name && <div>
          <h2>
            Welcome {user.name}
          </h2>
          <p>
            You have logged in with :<b> {user.email}</b>
          </p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
