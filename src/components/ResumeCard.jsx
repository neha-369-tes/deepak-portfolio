import React from 'react';
import './ResumeCard.css';

const ResumeCard = () => {
  const handleDownload = (e) => {
    // Prevent default clicking action on the checkbox
    // so we can trigger the link directly or allow CSS animation first
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/resume/1codvjqt_Deepak-Kathiravan-FlowCV-Resume-20251025.pdf';
      link.download = 'Deepak-Kathiravan-Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 3900); // 3.5s delay + 0.4s for animation to finish
  };

  return (
    <div className="resume-card-wrapper">
      <div className="resume-card">
        <img src="/prof-pics/resume_card_nobg.png" alt="Profile" className="free-form-photo" />

        <div className="resume-text">
          <span className="resume-title">Deepak<br />Kathiravan</span>
          <p className="resume-subtitle" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>Executive Engineer at Autobotz Pvt Ltd</p>
        </div>

        <div className="container">
          <label className="label">
            <input type="checkbox" className="input" onChange={handleDownload} />
            <span className="circle">
              <svg
                className="icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 19V5m0 14-4-4m4 4 4-4"
                ></path>
              </svg>
              <div className="square"></div>
            </span>
            <p className="btn-title">Download</p>
            <p className="btn-title">Open</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;