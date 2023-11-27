import { useState, ChangeEventHandler, MouseEventHandler, ButtonHTMLAttributes } from 'react';
import { Input } from '@/Presentation/Component';
import { Button } from '@/Presentation/Component';
import { Todo } from '@/Presentation/Component'
import style from '@/Presentation/Style/Login.module.css';

const Login = () => {

  const [id, SetId] = useState("");
  const idOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    SetId(e.target.value);
  }

  const loginClick: MouseEventHandler<HTMLButtonElement> = () => {
    console.log("login clicked!");
  }

  // isTodoCheck === false, make progress bar
  const [sliderValue, setSliderValue] = useState(0);
  const handleSliderChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
  };
  
  // isTodoCheck ===true, make toggle button 
  const [isDone, setIsDone] = useState(true);
  const handleDone: ChangeEventHandler<HTMLInputElement> = () => {
    setIsDone((prev) => !prev);
  }

  return (
    <div className={style.Login}>
      <div className={style.ContentBox}>
        <h2>로그인</h2>
        <Input
          width="100%"
          height="60px"
          text={id}
          fontSize="20px"
          placeHolder="example@email.com"
          onChange={idOnChange}
        />
        <Button
          width="100%"
          height="60px"
          fontSize="24px"
          backgroundColor="#49A078"
          color="#FFF"
          children="계속하기"
          imgsrc='#'
          onClick={loginClick}
        />
        <h3>회원가입</h3>
        <Button
          width="100%"
          height="60px"
          fontSize="24px"
          backgroundColor="#FFFF00"
          color="#252525"
          children="카카오 로그인"
          imgsrc='#'
          onClick={loginClick}
        />
        <Button
          width="100%"
          height="60px"
          fontSize="24px"
          backgroundColor="#29a135"
          color="#FFF"
          children="네이버 로그인"
          imgsrc='#'
          onClick={loginClick}
        />
        <Todo
          todoName='캡스톤디자인 UI ~12/14'
          isTodoCheck={false}
          value={sliderValue}
          onChange={handleSliderChange}
          checked={undefined}
        // 드래그바가 있는 과제면 onChange 이므로,,,
        />

        <Todo
          todoName='도서 반납'
          isTodoCheck={true}
          value={sliderValue}
          onChange={handleDone}
          checked={isDone}
        // 토글 형식의 과제면 onClick 이므로
        />
      </div>
    </div>
  );
};

export default Login;