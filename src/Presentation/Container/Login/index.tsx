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
        <h2>{isIdVaild ? "비밀번호 입력" : "로그인"}</h2>
        {isIdVaild ? (
          <Input
            width="100%"
            height="60px"
            text={pwd}
            type="password"
            fontSize="20px"
            placeHolder={"your password"}
            onChange={pwdOnChange}
          />
        ) : (
          <Input
            type="id"
            width="100%"
            height="60px"
            text={id}
            fontSize="20px"
            placeHolder={"example@email.com"}
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
        <button className={style.kakao}>
          <a href="http://3.34.48.41:8000/oauth2/authorization/kakao/?redirect_url=localhost:3000/logincheck">
            <Image
              src={KakaoLoginImage}
              alt="카카오 로그인 이미지"
              width={440}
            />
          </a>
        </button>
        <p className={style.sign} onClick={getSignUp}>
          회원가입
        </p>
      </div>
    </div>
  );
};

export default Login;
