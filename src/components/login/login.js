import React, { useState } from "react";
import Swal from 'sweetalert2';

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "firebase";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

import { firebase, database, firestore } from '../utils/firebase';

import loginImg from '../../images/school.jpeg';

export function Login({getUser, setLoginStatus}) {
  const [userInfo, setUserInfo] = useState('');

  const callLogout = () => {
    firebase.auth().signOut().then(function() {
      // log out successfully
    }).catch(function(error) {
      // An error happened.
    });
  }

  const callFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      const data = user.providerData[0];
      const phoneNumber = data.phoneNumber || '';
      const displayName = data.displayName || '';
      const email = data.email || '';
      const userId = data.uid;
      const photoURL = data.photoURL;
      const providerId = data.providerId;

      // Add a new document in collection "cities"
      firestore.collection("users").doc(userId).set({
        username: displayName,
        email: email,
        phone: phoneNumber,
        url: photoURL,
        provider: providerId,
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
      
      setLoginStatus();
      // console.log('user: ');
      // console.log(user);
    }).catch(function(error) {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;
      // ...
      console.log(errorMessage);
      Swal.fire({
        icon: 'error',
        title: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
    });
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      setLoginStatus();
    } else {
      // No user is signed in.
    }
  });
  

  return (
    <div className="base-container">
      <div className='header'>Đăng nhập</div>
      <div className='content'>
        <div className="image">
          <img src={loginImg} />
        </div>
        <div>{userInfo}</div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={() => callFacebook()}>Đăng nhập</button>
        
      </div>

    </div> );
}