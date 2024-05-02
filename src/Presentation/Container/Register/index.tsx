import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Input, Button } from "@/Presentation/Component";
import { useRouter } from "next/router";
import { SignUpUseCase } from '@/Domain/UseCase';
import { AuthRepositoryImpl } from "@/Data/Repository";

import style from "@/Presentation/Style/Register.module.css";

const Register = () => {
  const router = useRouter();
  const signUpUseCase = new SignUpUseCase(new AuthRepositoryImpl());
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [checkPage, setCheckPage] = useState(false);
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");

  const idOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const pwOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPw(e.target.value);
  };
  const checkPwOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCheckPw(e.target.value);
  };
  const nameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  }
  const nickNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickName(e.target.value);
  }

  const pageChangeOnClick : MouseEventHandler<HTMLButtonElement> = (e) => {
    if(pw !== checkPw){
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    setCheckPage(true);
  }
  const registerOnClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      const data = await signUpUseCase.execute({
        id,
        password: pw,
        name,
        nickname: nickName,
        imageUrl: ""
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.Register}>
      <div className={style.ContentBox}>
        <h1>회원가입</h1>
        {(checkPage) ? (
          <>
            <Input
              type="id"
              width="100%"
              height="36px"
              text={name}
              fontSize="14px"
              placeHolder={"이름을 입력해주세요"}
              onChange={nameOnChange}
            />
            <Input
              type="id"
              width="100%"
              height="36px"
              text={nickName}
              fontSize="14px"
              placeHolder={"닉네임을 입력해주세요"}
              onChange={nickNameOnChange}
            />
            <Button
              width="100%"
              height="42px"
              fontSize="18px"
              backgroundColor="#49A078"
              color="#FFF"
              imgsrc="#"
              onClick={registerOnClick}
            >
              회원가입  
            </Button>
          </>
        ) : (
          <>
            <Input
              type="id"
              width="100%"
              height="36px"
              text={id}
              fontSize="14px"
              placeHolder={"아이디를 입력해주세요"}
              onChange={idOnChange}
            />
            <Input
              type="password"
              width="100%"
              height="36px"
              text={pw}
              fontSize="14px"
              placeHolder={"비밀번호를 입력해주세요"}
              onChange={pwOnChange}
            />
            <Input
              type="password"
              width="100%"
              height="36px"
              text={checkPw}
              fontSize="14px"
              placeHolder={"비밀번호를 한번 더 입력해주세요"}
              onChange={checkPwOnChange}
            />
          

            <Button
              width="100%"
              height="42px"
              fontSize="18px"
              backgroundColor="#49A078"
              color="#FFF"
              imgsrc="#"
              onClick={pageChangeOnClick}
            >
              정보입력  
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
