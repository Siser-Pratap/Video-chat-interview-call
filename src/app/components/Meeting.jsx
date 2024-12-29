import React, { useState } from 'react';

const Meeting = () => {
  const [meetingUrl, setMeetingUrl] = useState('');

  const generateMeetingUrl = async(e) => {
    e.preventDefault();
    try {
        const res = await axios.get("/api/users/createMeeting");    
    } catch (error) {
        
    }
    
    
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Create a Video Meeting</h1>
      <button onClick={generateMeetingUrl} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Create Meeting
      </button>
      {meetingUrl && (
        <div style={{ marginTop: '20px' }}>
          <h2>Meeting URL:</h2>
          <a href={meetingUrl} target="_blank" rel="noopener noreferrer">
            {meetingUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default Meeting;