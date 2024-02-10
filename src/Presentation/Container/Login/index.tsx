import { useState, ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import { Input } from '@/Presentation/Component';
import { Button } from '@/Presentation/Component';
import { useRouter } from 'next/router';
import style from '@/Presentation/Style/Login.module.css';

const Login = () => {
  const router = useRouter();
  const [loginButtonText, setLoginButtonText] = useState('계속하기');
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [isIdVaild, setIdValid] = useState(false);

  const idOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const idSetClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (id !== '') {
      setIdValid(true);
      setLoginButtonText('로그인하기');
    } else {
      alert('Please input valid ID');
    }
  };

  const pwdOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPwd(e.target.value);
  };
  const pwdVaildCheck: MouseEventHandler<HTMLButtonElement> = () => {
    if (pwd !== '') {
      console.log(`id : ${id}, pwd : ${pwd}`);
      router.push('/main');
    } else {
      alert('Please input valid Password');
    }
  };
  const getSignUp = () => {
    router.push("./register");
  };

  return (
    <div className={style.Login}>
      <div className={style.ContentBox}>
        <h2>{isIdVaild ? '비밀번호 입력' : '로그인'}</h2>
        {isIdVaild ? (
          <Input
            width="100%"
            height="60px"
            text={pwd}
            type="password"
            fontSize="20px"
            placeHolder={'your password'}
            onChange={pwdOnChange}
          />
        ) : (
          <Input
            type="id"
            width="100%"
            height="60px"
            text={id}
            fontSize="20px"
            placeHolder={'example@email.com'}
            onChange={idOnChange}
          />
        )}
        <Button
          width="100%"
          height="60px"
          fontSize="24px"
          backgroundColor="#49A078"
          color="#FFF"
          children={loginButtonText}
          imgsrc="#"
          onClick={isIdVaild ? pwdVaildCheck : idSetClick}
        />
        <button>
          <a href="http://3.34.48.41:8000/oauth2/authorization/kakao/?redirect_url=localhost:3000/logincheck">
            <img
              src='/Users/3qufq/vscode_works/kimmallangPR/Frontend/src/Presentation/Resource/kakao_login_large_wide.png'
              alt="카카오 로그인 버튼"
            />
          </a>
        </button>
        <p onClick={getSignUp}>회원가입</p>
      </div>
    </div>
  );
};

export default Login;
