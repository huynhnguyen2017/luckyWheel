import React, { useState } from "react";

import "./App.scss";
import { Login, Administrator } from "./components/login/index";
import { Input } from "./components/main/index";
import { Wheel } from "./components/main/index";
import PrizeResult from './components/main/result';

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
    console.log(`prize result: ${prizeResult}`);
  }

  // popup show
  const [show, setShow] = useState(false);

  const closeShow = () => {
    setShow(false);
  }

  const openShow = () => {
    setShow(true);
  }
   
  return (
    <div className="d-flex">
      <Input setInputObject={receiveChildValue}/>
      <Wheel prizeNumberList={prizeNumberList} imageAsUrlList={imageAsUrlList} setPrizeIndex={prizeIndex} showResult={show} open={openShow}/>
      {show && 
        <PrizeResult getPrizeIndex={prizeResult} hidden={closeShow} showResult={show} imageAsUrlList={imageAsUrlList}/>}
      {/* <div className="App">
      <div className="login">
        <div className="container">
          {isLogginActive && (
            <Login/>
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
    </div> */}
    </div>    
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