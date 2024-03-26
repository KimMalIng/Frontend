import React, { use, useState } from 'react';

function PeriodInput({toClear}) {
  // @dev stat_hour, start_minute
  const [sHour, setSHour] = useState('00');
  const [sMinute, setSMinute] = useState('00');

  // @dev end_hour, end_minute
  const [eHour, setEHour] = useState('00');
  const [eMinute, setEMinute] = useState('00');

  const handleSHourChange = (e) => {
    const newHour = e.target.value.padStart(2, '0');
    setSHour(newHour);
  };
  const handleSMinuteChange = (e) => {
    const newMinute = e.target.value.padStart(2, '0');
    setSMinute(newMinute);
  };

  const handleEHourChange = (e) => {
    const newHour = e.target.value.padStart(2, '0');
    setEHour(newHour);
  };
  const handleEMinuteChange = (e) => {
    const newMinute = e.target.value.padStart(2, '0');
    setEMinute(newMinute);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <p style={{ fontSize: "18px" }}>시작</p>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <input
          style={{ width: "65px", height: "50px", fontSize: "26px", backgroundColor: "#FFF", borderRadius: "10px", paddingInlineStart: "16px" }}
          type="number"
          className="timeBox"
          value={sHour}
          onChange={handleSHourChange}
          maxLength="100"
        />
        <p style={{ fontSize: "50px" }}>: </p>
        <input
          style={{ width: "65px", height: "50px", fontSize: "26px", backgroundColor: "#FFF", borderRadius: "10px", paddingInlineStart: "16px" }}
          type="number"
          className="timeBox"
          value={sMinute}
          onChange={handleSMinuteChange}
          step="10" min="0" max="50"
        />
      </div>
      {!toClear &&
        <>
          <p style={{ fontSize: "18px" }}>종료</p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              style={{ width: "65px", height: "50px", fontSize: "26px", backgroundColor: "#FFF", borderRadius: "10px", paddingInlineStart: "16px" }}
              type="number"
              className="timeBox"
              value={eHour}
              onChange={handleEHourChange}
              maxLength="100"
            />
            <p style={{ fontSize: "50px" }}>: </p>
            <input
              style={{ width: "65px", height: "50px", fontSize: "26px", backgroundColor: "#FFF", borderRadius: "10px", paddingInlineStart: "16px" }}
              type="number"
              className="timeBox"
              value={eMinute}
              onChange={handleEMinuteChange}
              step="10" min="0" max="50"
            />
          </div>
        </>

      }

    </div>
  );
};

export default PeriodInput;