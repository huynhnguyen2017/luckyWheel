import React from "react";
import loginImg from '../../images/school.jpeg';

export function Administrator() {
  return (
    <div className="base-container">
      <div className='header'>Quản trị viên</div>
      <div className='content'>
        <div className="image">
          <img src={loginImg} />
        </div>
      </div>
      
      <div className="footer">
        <button type="button" className="btn">Đăng nhập</button>
      </div>
    </div>
  );
}
