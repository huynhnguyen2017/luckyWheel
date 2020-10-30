import React, { useEffect, useState } from "react";
// import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image'
import { firebase, database } from '../utils/firebase';

function PrizeList({ userId, result }) {   // { value, onChange }
  const [prizes, setPrizes] = useState([]);
  const [numbers, setNumbers] = useState([]);

  const colors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ];

  // get current user
  const user = firebase.auth().currentUser;
  useEffect(() => {
    database.ref("/users/" + user.providerData[0].uid).once('value').then(function(snapshot) {
      setPrizes([]);
      setNumbers([]);
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        setPrizes(prevObject => ([...prevObject, childData.image]));
        setNumbers(prevObject => ([...prevObject, childData.number]));
      });
    });
  }, []);

    // check and append prizes

  return (
    <div>
      <h3 style={{ marginBottom: 6 }}>
        <strong>Giải thưởng</strong>
      </h3>
      <p style={{ margin: "6px 0px" }}>
        <small>Tên giải thưởng</small>
      </p>
      {(prizes && prizes.map((prize, num) => {
          const randNum = Math.floor(Math.random() * colors.lenth);
          return (
            <div>
              <img src={prize} alt="image tag" style={{margin: '5px 10px 5px 10px'}} height="50px" width="50px" />
              <span style={{marginLeft: 10, border: "2px solid red"}}>{numbers[num]}</span>
            </div>
          );
        }))
      }
    </div>
  );
}

export default PrizeList;
