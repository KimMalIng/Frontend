import React, { useState } from 'react';

function PeriodInput({ toClear }) {
  // @dev stat_hour, start_minute
  const [sHour, setSHour] = useState('00');
  const [sMinute, setSMinute] = useState('00');

  // @dev end_hour, end_minute
  const [eHour, setEHour] = useState('00');
  const [eMinute, setEMinute] = useState('00');

  // 시작시간 > 종료시간인 경우 다음 날까지로 인식
  const [nextDay, setNextDay] = useState(false);

  const handleSHourChange = (e) => {
    const value = e.target.value;
    if (value < 0 || value > 23) {
      alert("입력 가능 범위 : 0시 ~ 23시 (24시 == 0시)");
      return;
    } else {
      setSHour(value);
    }
  };

  const handleEHourChange = (e) => {
    const value = e.target.value;
    if (value < 0 || value > 23) {
      alert("입력 가능 범위 : 0시 ~ 23시 (24시 == 0시)");
      return;
    } else {
      setEHour(value);
    }
  };

  const handleSMinuteChange = (e) => {
    const value = e.target.value;
    if (value < 0 || value > 59) {
      alert("입력 가능 범위 : 0 ~ 50");
      return;
    }
    if (value < 10) {
      setSMinute(value);
      return;
    }
    if (value % 10 < 5) {
      setSMinute(Math.floor(value / 10) * 10);
      return;
    }
    if (value > 54 && sHour < 50) {
      setSHour((prev) => (Number(prev) + 1));
      setSMinute(0);
      return;
    }
    if (sHour >= 24) {
      alert("최소 입력 가능 시간 : 00시간 10분 / 최대 입락 가능 시간 : 50시간 00분");
      setSHour(0);
      return;
    }
    if (value % 10 > 5) {
      setSMinute(Math.ceil(value / 10) * 10);
      return;
    };
  };

  const handleEMinuteChange = (e) => {
    const value = e.target.value;
    if (value < 0 || value > 59) {
      alert("입력 가능 범위 : 0 ~ 50");
      return;
    }
    if (value < 10) {
      setEMinute(value);
      console.log(eMinute);
      return;
    }
    if (value % 10 < 5) {
      setEMinute(Math.floor(value / 10) * 10);
      return;
    }
    if (value > 54 && eHour < 50) {
      setEHour((prev) => (Number(prev) + 1));
      setEMinute(0);
      return;
    }
    if (eHour >= 24) {
      alert("다음 날까지 이어지는 일정입니다");
      setEHour(0);
      return;
    }
    if (value % 10 > 5) {
      setEMinute(Math.ceil(value / 10) * 10);
      return;
    };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <p style={{ fontSize: "16px" }}>시작</p>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <input
          style={{ width: "55px", height: "45px", fontSize: "22px", backgroundColor: "#FFF", borderRadius: "5px", paddingInlineStart: "12px" }}
          type="number"
          className="timeBox"
          value={sHour}
          onChange={handleSHourChange}
          maxLength="100"
        />
        <p style={{ fontSize: "50px" }}>: </p>
        <input
          style={{ width: "55px", height: "45px", fontSize: "22px", backgroundColor: "#FFF", borderRadius: "5px", paddingInlineStart: "12px" }}
          type="number"
          className="timeBox"
          value={sMinute}
          onChange={handleSMinuteChange}
          step="10" min="0" max="50"
        />
      </div>
      <p style={{ fontSize: "16px" }}>종료</p>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <input
          style={{ width: "55px", height: "45px", fontSize: "22px", backgroundColor: "#FFF", borderRadius: "5px", paddingInlineStart: "12px" }}
          type="number"
          className="timeBox"
          value={eHour}
          onChange={handleEHourChange}
          maxLength="100"
        />
        <p style={{ fontSize: "50px" }}>: </p>
        <input
          style={{ width: "55px", height: "45px", fontSize: "22px", backgroundColor: "#FFF", borderRadius: "5px", paddingInlineStart: "12px" }}
          type="number"
          className="timeBox"
          value={eMinute}
          onChange={handleEMinuteChange}
          step="10" min="0" max="50"
        />
      </div>
    </div >
  );
};

export default PeriodInput;