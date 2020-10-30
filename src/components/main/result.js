import React from "react";
import "./resultAlert.css";

function ResultAlert({getPrizeIndex, showResult, hidden, imageAsUrlList}) {
  // const imageIndex = settings.imageKeys.indexOf(id);

  return (
    <div className={"dialog" + (showResult ? " show-up" : "")}>
      <div className={`dialog-content ${showResult ? " show-up" : ""}`}>
          <div>
            {imageAsUrlList && (
              <p className="bigtext">
                Chúc mừng
              </p>
            )}
            <img
              width="500px"
              src={imageAsUrlList[getPrizeIndex]}
              alt="123"
            />
          </div>
        <button className="close-btn" onClick={hidden}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export default ResultAlert;