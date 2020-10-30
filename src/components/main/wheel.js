import React, { useState, useRef, useEffect } from 'react';
import Img from '../../images/school.jpeg';
import { firebase, database } from '../utils/firebase';

export function Wheel({prizeNumberList, imageAsUrlList, setPrizeIndex, open, close}) {

  const length = prizeNumberList.length;

  const [cellCount, setCellCount] = useState(15); // cellCount set from cells-range input value
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [rotateFn, setRotateFn] = useState('rotateX');
  
  const [angle, setAngle] = useState(0);

  const [offsetHeight, setOffsetHeight] = useState(138);


  const [radius, setRadius] = useState(0);

  // console.log( cellWidth, cellHeight );
  const carouselDiv = useRef(null);
  
  const [theta, setTheta] = useState(0);
  useEffect(() => {
    setTheta(360/length);
    setRadius(Math.round( ( offsetHeight / 2) / Math.tan( Math.PI / length )));
    
  }, [length, theta, offsetHeight]);

  // get current user
  const user = firebase.auth().currentUser;

  const [prizeCurrentNum, setPrizeCurrentNum] = useState(0);

  function rotateCarousel() {
    close();
    const currentAngle = (Math.abs(angle) + theta * selectedIndex + 360 * 2) * (-1);
    // identify the mod of list of images ?????????
    const testIndex = (Math.abs(angle / theta) + selectedIndex) % length;
    
    const image_ = imageAsUrlList[testIndex] || [];
    
    
    if (image_.length > 0) {

      const image_first = image_.length > 0 && image_.split("?")[0].split('/');
      const image_second = image_first.length > 0 && image_first[image_first.length - 1].split('.')[0];

      // check database
      database.ref("/users/" + user.providerData[0].uid + "/" + image_second).once('value').then(function(snapshot) {
        if (snapshot && snapshot.val()) {
          const currentNum = snapshot.val().number;
          // save  prize to firebase
          database.ref("/users/" + user.providerData[0].uid + "/" + image_second).set({
            image: imageAsUrlList[testIndex],
            number: currentNum + 1
          });
        }
        else {
          database.ref("/users/" + user.providerData[0].uid + "/" + image_second).set({
            image: imageAsUrlList[testIndex],
            number: 1
          });
        }
      });
    }
    

    

    setPrizeIndex(testIndex);
    setAngle(currentAngle);
    // console.log(angle);
    // console.log(theta);
    // console.log(selectedIndex);
    const { offsetHeight } = carouselDiv.current;
    setOffsetHeight(offsetHeight);
    setRadius(Math.round( ( offsetHeight / 2) / Math.tan( Math.PI / length )));
    // console.log(offsetHeight);
  }
  
  
  {
    return (
      <>
      { 
        imageAsUrlList && (
          <div>
            <div className="scene">
              <div className="carousel" ref={carouselDiv} style={{transform: `translateZ(${-radius}px) rotateX(${angle}deg)`, transitionDuration: '6s'}}>
                {imageAsUrlList.map((image, num) => {
                  const cellAngle = theta * (num);            
                  return <img src={image} className="carousel__cell" style={{opacity: 1, transform: `rotateX(${cellAngle}deg) translateZ(${radius}px)`}} />;
                })}
              </div>
            </div>
  
            <div className="carousel-options">
              <p>
                <button className="btn btn-primary" onClick={() => {
                  const random_number = Math.floor(Math.random() * length);
                  setSelectedIndex(selectedIndex + random_number);
                  rotateCarousel();
                  setTimeout(
                    () => open(), 
                    7000
                  );
                            
                }}>Start</button>
              </p>
            </div>
          </div>
        )
      }
      </>
    );
  }
  return null;
}