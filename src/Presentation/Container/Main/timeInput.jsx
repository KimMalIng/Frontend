import React, { useState, useEffect } from 'react';

function TimeInput({setExpectTime}) {
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  useEffect(()=>{
    const val = hour*60 + minute*1;
    setExpectTime(val);
  },[hour, minute]);

  const handleHourChange = (e) => {
    const value = e.target.value;
    if(value < 0 || value > 50) {
      alert("입력 가능 범위 : 0 ~ 50");
      return;
    } else {
      setHour(value);
    }
  };
  const handleMinuteChange =  (e) => {
    const value = e.target.value;
    if(value < 0 || value > 59) {
      alert("입력 가능 범위 : 0 ~ 50");
      return;
    }
    if(value<10) {
      setMinute(value);
      console.log(minute);
      return;
    }
    if(value%10 < 5) {
      setMinute(Math.floor(value/10)*10);
      return;
    }
    if(value > 54 && hour < 50) {
      setHour((prev)=>(Number(prev)+1));
      setMinute(0);
      return;
    }
    if(hour >= 50) {
      alert("최소 입력 가능 시간 : 00시간 10분 / 최대 입락 가능 시간 : 50시간 00분");
      setHour(0);
      setMinute(0);
      return;
    }
    if(value%10 > 4){
      setMinute(Math.ceil(value/10)*10);
      return;
    };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px"}}>
      <p style={{ fontSize: "16px" }}>예상 소요 시간</p>
      <div style={{ display: "flex", alignItems:"center", gap:"5px" }}>
        <input
          style={{ width: "55px", height: "45px", fontSize: "22px", backgroundColor: "#FFF", borderRadius: "5px", paddingInlineStart: "12px", color:"#064d2c"}}
          type="number"
          className="timeBox"
          value={hour}
          onChange={handleHourChange}
          maxLength="2"
        />
        <p style={{ fontSize: "50px" }}>: </p>
        <input
          style={{ width: "55px", height: "45px", fontSize: "22px", backgroundColor: "#FFF", borderRadius: "5px", paddingInlineStart: "12px", color:"#064d2c"}}
          type="number"
          className="timeBox"
          value={minute}
          onChange={handleMinuteChange}
          maxLength={2}
          step="10"
        />
      </div>
    </div>
  );
};

export default TimeInput;