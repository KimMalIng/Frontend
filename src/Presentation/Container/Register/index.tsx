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
        <h1>사용할 아이디, 비밀번호를 입력해주세요!</h1>
        <Input
          type="id"
          width="100%"
          height="36px"
          text={id}
          fontSize="16px"
          placeHolder={"아이디를 입력해주세요"}
          onChange={idOnChange}
        />
        <p onClick={isIdValid}>중복 확인</p>
        <Input
          type="password"
          width="100%"
          height="36px"
          text={pw}
          fontSize="16px"
          placeHolder={"비밀번호를 입력해주세요"}
          onChange={pwOnChange}
        />
        <Input
          type="password"
          width="100%"
          height="36px"
          text={checkPw}
          fontSize="16px"
          placeHolder={"비밀번호를 한번 더 입력해주세요"}
          onChange={checkPwOnChange}
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
