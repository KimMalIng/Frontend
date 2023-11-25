import { useState, ChangeEventHandler } from 'react';
import { Input } from '@/Presentation/Component';

import style from '@/Presentation/Style/Login.module.css';

const Login = () => {
  const [id, SetId] = useState("");

  const idOnChange: ChangeEventHandler<HTMLInputElement>= (e) => {
    SetId(e.target.value);
  }
  return(
    <div className={style.Login}>
      <div className={style.ContentBox}>
        <h2>로그인</h2>
        <Input 
          width="400px"
          height="44px"
          text={id}
          fontSize="14px"
          placeHolder="이메일을 입력해주세요"
          onChange={idOnChange}
        />
        <Input 
          width="400px"
          height="44px"
          text={id}
          fontSize="14px"
          placeHolder="이메일을 입력해주세요"
          onChange={idOnChange}
        />
        <Input 
          width="400px"
          height="44px"
          text={id}
          fontSize="14px"
          placeHolder="이메일을 입력해주세요"
          onChange={idOnChange}
        />
        <Input 
          width="400px"
          height="44px"
          text={id}
          fontSize="14px"
          placeHolder="이메일을 입력해주세요"
          onChange={idOnChange}
        />
        <Input 
          width="400px"
          height="44px"
          text={id}
          fontSize="14px"
          placeHolder="이메일을 입력해주세요"
          onChange={idOnChange}
        />

      </div>
    </div>
  );
};

export default Login;