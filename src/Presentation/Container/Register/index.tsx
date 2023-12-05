import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { Input, Button } from '@/Presentation/Component';

import style from '@/Presentation/Style/Register.module.css';

const Register = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [major, setMajor] = useState('');
  const [university, setUniversity] = useState('');

  const idOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const pwOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPw(e.target.value);
  };
  const nameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const nicknameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };
  const majorOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMajor(e.target.value);
  };
  const universityOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUniversity(e.target.value);
  };
  const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {};

  return (
    <div className={style.Register}>
      <div className={style.ContentBox}>
        <Input
          type="id"
          width="100%"
          height="60px"
          text={id}
          fontSize="16px"
          placeHolder={'아이디를 입력해주세요'}
          onChange={idOnChange}
        />
        <Input
          type="id"
          width="100%"
          height="60px"
          text={pw}
          fontSize="16px"
          placeHolder={'비밀번호를 입력해주세요'}
          onChange={pwOnChange}
        />
        <Input
          type="id"
          width="100%"
          height="60px"
          text={name}
          fontSize="16px"
          placeHolder={'이름을 입력해주세요'}
          onChange={nameOnChange}
        />
        <Input
          type="id"
          width="100%"
          height="60px"
          text={nickname}
          fontSize="16px"
          placeHolder={'닉네임을 입력해주세요'}
          onChange={nicknameOnChange}
        />
        <Input
          type="id"
          width="100%"
          height="60px"
          text={university}
          fontSize="16px"
          placeHolder={'대학교를 입력해주세요'}
          onChange={universityOnChange}
        />
        <Input
          type="id"
          width="100%"
          height="60px"
          text={major}
          fontSize="16px"
          placeHolder={'과, 학부를 입력해주세요'}
          onChange={majorOnChange}
        />
        <Button
          width="100%"
          height="60px"
          fontSize="24px"
          backgroundColor="#49A078"
          color="#FFF"
          imgsrc="#"
          onClick={onSubmit}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default Register;
