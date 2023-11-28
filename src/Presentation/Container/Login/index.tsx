import { useState, ChangeEventHandler, MouseEventHandler } from 'react';
import { Input } from '@/Presentation/Component';
import { Button } from '@/Presentation/Component';
import style from '@/Presentation/Style/Login.module.css';

const Login = () => {

  const [id, SetId] = useState("");
  const idOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    SetId(e.target.value);
  }

  const loginClick: MouseEventHandler<HTMLButtonElement> = () => {
    console.log("login clicked!");
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
      </div>
    </div>
  );
};

export default Login;