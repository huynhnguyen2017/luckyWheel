import React, { useState } from "react";
import Swal from 'sweetalert2';

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "firebase";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

import { firebase, database } from '../utils/firebase';

import loginImg from '../../images/school.jpeg';

export function Login({getUser}) {
    // TODO: Replace the following with your app's Firebase project configuration
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  // const firebaseConfig = {
  //   apiKey: "AIzaSyAUK7wbDlwVJBuIsXFdxiNW3q3a8rcaZNY",
  //   authDomain: "luckywheel-e0bd7.firebaseapp.com",
  //   databaseURL: "https://luckywheel-e0bd7.firebaseio.com",
  //   projectId: "luckywheel-e0bd7",
  //   storageBucket: "luckywheel-e0bd7.appspot.com",
  //   messagingSenderId: "686055839926",
  //   appId: "1:686055839926:web:dee3d238eaf61373026e17",
  //   measurementId: "G-47P5LMELNX"
  // };

  // // Initialize Firebase
  // if (!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig);

  //   firebase.analytics();
  // }
  // const database = Firebase.database();
  const [userInfo, setUserInfo] = useState('');

  const callLogout = () => {
    firebase.auth().signOut().then(function() {
      Swal.fire({
        icon: 'success',
        title: 'Logout suceeds',
        showConfirmButton: false,
        timer: 2000,
      });
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
      
      const phoneNumber = user.phoneNumber || '';
      const displayName = user.displayName || '';
      const email = user.email || '';
      const userId = user.uid;
      
      database.ref('/users/' + userId).set({
        username: displayName,
        email: email,
        phone: phoneNumber        
      });
      console.log('user: ');
      console.log(user);
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
        <button type="button" className="btn" onClick={() => callLogout()}>Đăng xuất</button>
      </div>

    </div> );
}