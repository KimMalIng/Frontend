import React, { useState } from 'react';

function TimeInput() {
  const [minute, setMinute] = useState('00');
  const [hour, setHour] = useState('00');

  const handleHourChange = (e) => {
    const newHour = e.target.value.padStart(2, '0');
    setHour(newHour);
  };
  const handleMinuteChange = (e) => {
    const newMinute = e.target.value.padStart(2, '0');
    setMinute(newMinute);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <p style={{ fontSize: "18px" }}>예상 소요 시간</p>
      <div style={{ display: "flex", gap: "5px", marginTop:"4px" }}>
        <input
          style={{ width: "65px", height: "50px", fontSize: "26px", backgroundColor: "#FFF", borderRadius: "10px", paddingInlineStart: "16px" }}
          type="number"
          className="timeBox"
          value={hour}
          onChange={handleHourChange}
          maxLength="100"
        />
        <p style={{ fontSize: "50px" }}>: </p>
        <input
          style={{ width: "65px", height: "50px", fontSize: "26px", backgroundColor: "#FFF", borderRadius: "10px", paddingInlineStart: "16px" }}
          type="number"
          className="timeBox"
          value={minute}
          onChange={handleMinuteChange}
          step="10" min="0" max="50"
        />
      </div>
    </div>
  );
};

export default TimeInput;