import React from 'react';
import "./LandingPage.css"; 

function LandingPage() {
  return ( 
    <div className="main-page">

      <div className="patient-input">
        <h1>
          SELAMAT DATANG
        </h1>

        <div>
          <p>Patient Name</p>
          <input placeholder="Insert Name" />
        </div>

        <div>
          <p>Date</p>
          <input placeholder="Insert Date" />
        </div>

        <div>
          <p>Note</p>
          <input placeholder="Insert Note" />
        </div>
        
      </div>

    </div>
  );
}

export default LandingPage;