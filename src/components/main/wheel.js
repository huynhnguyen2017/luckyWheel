import React, { useState, useRef, useEffect } from 'react';
import Img from '../../images/school.jpeg';

export function Wheel({prizeNumberList, imageAsUrlList, setPrizeIndex, open}) {

  const { length } = prizeNumberList;

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
  }, [length, theta]);

  function rotateCarousel() {
    const currentAngle = (Math.abs(angle) + theta * selectedIndex + 360 * 2) * (-1);
    // identify the mod of list of images ?????????
    const testIndex = (Math.abs(angle / theta) + selectedIndex) % length;
    console.log(`index: ${testIndex}`);
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
  
  
  if (length > 3) {
    return (
      <>
      { 
        imageAsUrlList && (
          <>
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
                <button className="next-button btn btn-primary" onClick={() => {
                  const random_number = Math.floor(Math.random() * length);
                  setSelectedIndex(selectedIndex + random_number);
                  rotateCarousel();
                  open();          
                }}>Start</button>
              </p>
            </div>
          </>
        )
      }
      </>
    );
  }
  return null;
}