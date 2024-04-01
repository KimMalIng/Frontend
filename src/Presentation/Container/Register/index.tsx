import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Input, Button } from "@/Presentation/Component";

import style from "@/Presentation/Style/Register.module.css";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [idChecked, isIdChecked] = useState(false);
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");

  const idOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const isIdValid = () => {
    alert("사용 가능한 아이디입니다");
    isIdChecked(true);
  };
  const pwOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPw(e.target.value);
  };
  const checkPwOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCheckPw(e.target.value);
  };
  const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (id && idChecked && pw && pw == checkPw) {
      router.push("./getuserdata");
    } else if (!idChecked) {
      alert("아이디 중복 확인을 눌러주세요");
    } else if (pw !== checkPw) {
      alert("비밀번호가 다릅니다");
    }
  };

  return (
    <div className={style.Register}>
      <div className={style.ContentBox}>
        <h1>회원가입</h1>
        <div className={style.idCheckBox}>
          <Input
            type="id"
            width="76%"
            height="36px"
            text={id}
            fontSize="14px"
            placeHolder={"아이디를 입력해주세요"}
            onChange={idOnChange}
          />
          <div 
            className={style.idCheckBtn}
            onClick={isIdValid}
          >
            중복확인
          </div>
        </div>
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
          onClick={onSubmit}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default Register;
