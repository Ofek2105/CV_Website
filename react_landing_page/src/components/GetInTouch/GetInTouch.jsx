import React from 'react';
import './GetInTouch.css';

const GetInTouch = () => {
  return (
    <div className="get-in-touch">
      <div className="emoji">😊</div>
      <h2 className="heading">Let’s Get in Touch</h2>
      {/* <p className="quote">"The important thing is not to stop questioning. Curiosity has its own reason for existing." – Albert Einstein</p> */}
      <div className="contact-info">
        <p><strong>Email:</strong> ofek.nourian@gmail.com</p>
        <p><strong>Location:</strong> Center District, Israel</p>
      </div>
    </div>
  );
};

export default GetInTouch;
