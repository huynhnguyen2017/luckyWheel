import React, { useState } from "react";

import "./App.scss";
import { Login, Administrator } from "./components/login/index";

function App() { 

  const [isLogginActive, setIsLogginActive] = useState(true);
  const [current, setCurrent] = useState("Quản trị");
  const [currentActive, setCurrentActive] = useState("login");

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

  
  return (
    <div className="App">
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