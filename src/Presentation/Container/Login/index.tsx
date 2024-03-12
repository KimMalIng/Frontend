import {
  useState,
  useEffect,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import { Input } from "@/Presentation/Component";
import { Button } from "@/Presentation/Component";
import { useRouter } from "next/router";
import { KakaoLoginImage } from "@/Presentation/Resource";
import Image from "next/image";
import style from "@/Presentation/Style/Login.module.css";

const Login = () => {
  const router = useRouter();
  const [loginButtonText, setLoginButtonText] = useState("계속하기");
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [isIdVaild, setIdValid] = useState(false);

  const idOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const idSetClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (id !== "") {
      setIdValid(true);
      setLoginButtonText("로그인하기");
    } else {
      alert("Please input valid ID");
    }
  };

  const pwdOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPwd(e.target.value);
  };
  const pwdVaildCheck: MouseEventHandler<HTMLButtonElement> = () => {
    if (pwd !== "") {
      console.log(`id : ${id}, pwd : ${pwd}`);
      router.push("/main");
    } else {
      alert("Please input valid Password");
    }
  };
  const getSignUp = () => {
    router.push("./register");
  };

  return (
    <div className={style.Login}>
      <div className={style.ContentBox}>
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
          width="100%"
          height="36px"
          text={pwd}
          type="password"
          fontSize="14px"
          placeHolder={"비밀번호를 입력해주세요"}
          onChange={pwdOnChange}
        />
        <Button
          width="100%"
          height="44px"
          fontSize="18px"
          backgroundColor="#49A078"
          color="#FFF"
          children={loginButtonText}
          imgsrc="#"
          onClick={isIdVaild ? pwdVaildCheck : idSetClick}
        />
      </div>
    </div>
  );
};

export default Login;
