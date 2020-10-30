import React from "react";
import Alert from 'react-bootstrap/Alert';
import { database } from '../utils/firebase';

function PrizeList({ userId, result }) {   // { value, onChange }
  // const handleChange = (field) => (e) => {
  //   onChange({
  //     ...value,
  //     [field]: e.target.value,
  //   });
  // };
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

  database.ref('/users/' + userId).once('value').then(function(snapshot) {
    const fields = snapshot.val();
    if (fields && !snapshot.val().prizes) {
      database.ref('/users/' + userId).set({
        ...fields,
        prizes: {
          image: result,
          number: 1
        }
      });
    }

    // check and append prizes
    

  });

  return (
    <div>
      <h3 style={{ marginBottom: 6 }}>
        <strong>Giải thưởng</strong>
      </h3>
      <p style={{ margin: "6px 0px" }}>
        <small>Tên giải thưởng</small>
      </p>
      {colors.map((variant, idx) => (
        <Alert key={idx} variant={variant}>
          Quạt máy Swis
        </Alert>
      ))}
    </div>
  );
}

export default PrizeList;
