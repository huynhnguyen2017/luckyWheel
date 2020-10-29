import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { firebase, firestore, storage } from '../utils/firebase';
import "./input.css";

export function Input({setInputObject}) {

  const [counter, setCounter] = useState(0)

  // const allInputs = {imgUrl: '', number: 0}
  const [imageAsFile, setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState([]);
  // set number of prizes in input
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [prizeNumberSta, setPrizeNumberSta] = useState([])

  useEffect(() => {
    firestore.collection("prizeInput").get().then((querySnapshot) => {
      // console.log('check firestore: ');
      setImageAsUrl([]);
      setPrizeNumberSta([]);
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().prizeImage.split('?')[0].split('/')[7]}`);
        setImageAsUrl(prevObject => ([...prevObject, doc.data().prizeImage]));
        setPrizeNumberSta(prevObject => ([...prevObject, doc.data().number]));
        // setInputObject(imageAsUrl);
      });
    });
  }, []);

  
  setInputObject(prizeNumberSta, imageAsUrl);
  // console.log('link: ');
  // console.log(imageAsUrl);
  // console.log(prizeNumberSta);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
  }

  const handleFireBaseUpload = e => {
    e.preventDefault()
    console.log('start of upload')
    // async magic goes here...
    if(imageAsFile === '' ) {
      console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
    
    //initiates the firebase side uploading 
    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      // console.log(snapShot);
    }, (err) => {
      //catches the errors
      console.log(err);
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
      .then(fireBaseUrl => {
        // console.log('firebase: ');
        // console.log(fireBaseUrl);
        // console.log(prizeNumber);
        // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl, number: prizeNumber}));
        // console.log(imageAsUrl);
        setCounter(0);
        
        // save to firestore
        firestore.collection("prizeInput").add({
          prizeImage: fireBaseUrl,
          number: prizeNumber
        })
        .then(function(docRef) {
          setImageAsUrl(prevObject => ([...prevObject, fireBaseUrl]));
          setPrizeNumberSta(prevObject => ([...prevObject, prizeNumber]));
          setInputObject(imageAsUrl);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      });
    });
  }

  return (
    <div
    style={{
      width: 320,
      minWidth: 320,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <h3 style={{ marginBottom: 6 }}>
      <strong>Danh sách quay thưởng</strong>
    </h3>
    <p
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "6px 0px",
      }}
    >
      <small>Mỗi mục trên một dòng.</small>
      {/* <small>Đã nhập: {value.length}</small> */}
    </p>
    <div
      style={{
        flexGrow: 1,
        borderRadius: "12px",
        overflow: "hidden",
        width: "100%",
        paddingRight: 12,
        position: "relative",
      }}
    >
      <div 
        style={{
          width: "100%",
          minHeight: 100,
          height: "100%",
          backgroundColor: "#FFFFFF99",
          border: "none",
          padding: "6px",
          lineHeight: 1.5,
          fontSize: 18,
        }}
      >
        {/* Get database firebase ???????????? */}
        {prizeNumberSta && prizeNumberSta.map((value, num) => (<div className="d-flex align-items-center">
        <span>
          <input type="file" name="file1" id="file1" className="inputfile" onChange={handleImageAsFile}/>
          <label htmlFor="file1">Choose image</label>
        </span>     
        <img src={imageAsUrl[num]} alt="image tag" style={{margin: '5px 10px 5px 10px'}} height="50px" width="50px" />
        <input type="text" name="number1" className="inputNum" onChange={(e) => setPrizeNumber(e.target.value)} value={`${prizeNumberSta[num]}`}/>
        
        </div>))}
        {[...Array(counter).keys()].map(num => (
        <div className="d-flex align-items-center">
          <span style={{marginRight: 70}}>
            <input type="file" name="file1" id="file1" className="inputfile" onChange={handleImageAsFile}/>
            <label htmlFor="file1">Choose image</label>
          </span>     
          <input type="text" name="number1" className="inputNum" onChange={(e) => setPrizeNumber(e.target.value)} value={`${prizeNumberSta[num]}`}/>
        
        </div>))}
        
        {/* {imageAsUrl && imageAsUrl.map(image => console.log(image))} */}
        <button type="button" className="btnPlus btn" style={{fontSize: "15px"}} onClick={() => setCounter(counter+1)}>Thêm</button>
        {/* <button type="button" className="btnPlus btn" style={{fontSize: "15px", marginLeft: 3}} onClick={() => setCounter(0)}>Đặt lại</button> */}
        <button className="btn btn" style={{fontSize: "15px", marginLeft: 3}} onClick={handleFireBaseUpload}>Xong</button>
      </div>
    </div>
  </div>
    // <>
      
    // </>
  );
};