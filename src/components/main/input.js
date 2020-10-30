import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { firebase, firestore, storage, database } from '../utils/firebase';
import "./input.css";

export function Input({setInputObject}) {

  const [counter, setCounter] = useState(0)

  // const allInputs = {imgUrl: '', number: 0}
  const [imageAsFile, setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState([]);
  // set number of prizes in input
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [prizeNumberSta, setPrizeNumberSta] = useState([])

  const callFirebase = () => {
    database.ref("prizeInput").once('value').then(function(snapshot) {
      setImageAsUrl([]);
      setPrizeNumberSta([]);
      
      snapshot.forEach(function(childSnapshot) {
        // var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        setImageAsUrl(prevObject => ([...prevObject, childData.prizeImage]));
        setPrizeNumberSta(prevObject => ([...prevObject, childData.number]));
        setInputObject(prizeNumberSta, imageAsUrl);
        // print key and value
        // console.log(childData.prizeImage);
      });
    });
  };

  useEffect(() => {
    callFirebase();
  }, []);

  setInputObject(prizeNumberSta, imageAsUrl);

  // console.log('link: ');
  // console.log(imageAsUrl);
  // console.log(prizeNumberSta);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
  }

  // get name of file
  const getFile = (baseUrl) => {
    const image_first = baseUrl.split("?")[0].split('/');
    const image_second = image_first[image_first.length - 1].split('.')[0];
    return image_second;
  }

  // handle uploading images
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

        // save to firebase realtime
        // const image_ = imageAsUrlList[testIndex] || [];
    
    
        // if (image_.length > 0) {

        // const image_first = fireBaseUrl.split("?")[0].split('/');
        // const image_second = image_first[image_first.length - 1].split('.')[0];

        database.ref("/prizeInput/" + getFile(fireBaseUrl)).set({
          prizeImage: fireBaseUrl,
          number: prizeNumber
        });
        callFirebase();
        
      });
    });
  }

  // preview images before uploading...
  const [imgData, setImgData] = useState(null);

  const onChangePicture = e => {
    e.preventDefault();
    if (e.target.files[0]) {
      // console.log("picture: ", e.target.files);
      // setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      handleImageAsFile(e);
    }
  };

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
        {imageAsUrl &&
          imageAsUrl.map((image, num) => (<div className="d-flex align-items-center">
          <Button variant="danger" onClick={() => {
            database.ref("prizeInput").once('value').then(function(snapshot) {
              
              snapshot.forEach(function(childSnapshot) {
                const prize_image = getFile(childSnapshot.val().prizeImage);
                if (prize_image === getFile(image)) {
                  database.ref("/prizeInput/" + prize_image).remove();
                  callFirebase();
                }
              });
            });
            // database.ref("/prizeInput/image" + prizeNumberSta[num]).remove()
            // console.log("/prizeInput/image" + prizeNumberSta[num]);
            callFirebase();
          }}>Xóa</Button>    
          <img src={image} alt="image tag" style={{margin: '5px 10px 5px 10px'}} height="50px" width="50px" />
          <input type="text" name="number1" className="inputNum" onChange={(e) => setPrizeNumber(e.target.value)} value={`${prizeNumberSta[num]}`}/>
          
          </div>))
        }
        {[...Array(counter).keys()].map(num => (
        <div className="d-flex align-items-center">
          <span style={{marginRight: 70}}>
            <input type="file" name="file1" id="file1" className="inputfile" onChange={onChangePicture} />  {/* onChange={handleImageAsFile}*/}
            <label htmlFor="file1">Chọn hình</label>
          </span>
          <img src={imgData} alt="image tag" style={{margin: '5px 10px 5px 10px'}} height="50px" width="50px" />   
          <input type="text" name="number1" className="inputNum" onChange={(e) => setPrizeNumber(e.target.value)} />
        
        </div>))}
        
        {/* {imageAsUrl && imageAsUrl.map(image => console.log(image))} */}
        <button type="button" className="btnPlus btn inputBtn" style={{fontSize: "15px"}} onClick={() => setCounter(counter+1)}>Thêm ảnh</button>
        <button type="button" className="btnPlus btn inputBtn" style={{fontSize: "15px", marginLeft: 3}} onClick={() => setCounter(0)}>Đặt lại</button>
        <button className="btn inputBtn" style={{fontSize: "15px", marginLeft: 3}} onClick={handleFireBaseUpload}>Lưu</button>
      </div>
    </div>
  </div>
    // <>
      
    // </>
  );
};