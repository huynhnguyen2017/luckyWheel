import React from "react";
// import "./resultAlert.css";

function ResultAlert({getPrizeIndex, showResult, hidden, imageAsUrlList}) {
  // const imageIndex = settings.imageKeys.indexOf(id);

  return (
    <div className={"dialog" + (showResult ? " show-up" : "")}>
      <div className={`dialog-content ${showResult ? " show-up" : ""}`}>
        {/* {settings.mode === "text" && (
          <>
            <h2 className="title">Chúc mừng!</h2>
            <p className="bigtext">
              {settings.attendeePrefix} {id}
            </p>
            {prize && (
              <p className="subtitle">
                {settings.prizePrefix} {prize}
              </p>
            )}
          </>
        )} */}
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