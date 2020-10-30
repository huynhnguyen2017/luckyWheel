import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import "./App.scss";
import { Login, Administrator } from "./components/login/index";
import { Input } from "./components/main/index";
import { Wheel } from "./components/main/index";
import PrizeResult from './components/main/result';
import Output from './components/main/output';
import { firebase } from './components/utils/firebase';

function App() { 

  const [isLogginActive, setIsLogginActive] = useState(true);
  const [current, setCurrent] = useState("Quản trị");
  const [currentActive, setCurrentActive] = useState("login");

  // acquire list of image url and number
  const [prizeNumberList, setPrizeNumberList] = useState([]);
  const [imageAsUrlList, setImageAsUrlList] = useState([]);

  const changeState = () => {

    if (isLogginActive) {
      setIsLogginActive(false);
      setCurrent("Đăng nhập");
      setCurrentActive("admin");
    } else {
      setIsLogginActive(true);
      setCurrent("Quản trị");
      setCurrentActive("login");
    }
  }
  const receiveChildValue = (numbers, images) => {
    setPrizeNumberList(numbers);
    setImageAsUrlList(images)
  };

  // get prize index
  const [prizeResult, setPrizeResult] = useState(0);

  const prizeIndex = (value) => {
    setPrizeResult(value);
    // console.log(`prize result: ${prizeResult}`);
  }

  // popup show
  const [show, setShow] = useState(false);

  const closeShow = () => {
    setShow(false);
  }

  const openShow = () => {
    setShow(true);
  }

  const user = firebase.auth().currentUser;

  const [isNotLogged, setIsNotLogged] = useState(true);


  const getLoginStatus = () => {
    setIsNotLogged(false);
  }

  const callLogout = () => {
    firebase.auth().signOut().then(function() {
      setIsNotLogged(true);
    }).catch(function(error) {
      // An error happened.
    });
  }
   
  return (
    <>    
      {(user || !isNotLogged) && (<>
        <div className="d-flex justify-content-end"><button type="button" className="btn" onClick={() => callLogout()}>Đăng xuất</button></div>
        <div className="d-flex">
          <Input setInputObject={receiveChildValue}/>
          <div style={{minWidth: 600}}>
          <Wheel prizeNumberList={prizeNumberList} imageAsUrlList={imageAsUrlList} setPrizeIndex={prizeIndex} showResult={show} open={openShow} close={closeShow}/>
          </div>          
          {show && 
            <PrizeResult getPrizeIndex={prizeResult} hidden={closeShow} showResult={show} imageAsUrlList={imageAsUrlList}/>}
          <Output result={imageAsUrlList[prizeResult]} userId={user.providerData[0].uid}/>
          
        </div></>
      )}
      {(isNotLogged) && (
        <div className="App">
          <div className="login">
            <div className="container">
              {isLogginActive && (
                <Login setLoginStatus={getLoginStatus}/>
              )}
              {!isLogginActive && (
                <Administrator />
              )}
            </div>
            <RightSide
              current={current}
              currentActive={currentActive}
              clicked={changeState}
            />
          </div>
        </div>
      )}
      
    </>    
  );
}

const RightSide = ({current, currentActive, clicked}) => {
  return (
    <div
      className={`right-side  ${currentActive === 'login' ? 'left' : 'right'}`}
      onClick={() => clicked()}
    >
      <div className="inner-container">
      <div className="text">{current}</div>
      </div>
    </div>
  );
};

export default App;