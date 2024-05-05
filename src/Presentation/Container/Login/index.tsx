import {
  useState,
  useEffect,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import { Input, Button, Spinner } from "@/Presentation/Component";
import { useRouter } from "next/router";
import { LoginUsecase, SaveCredentialUseCase } from "@/Domain/UseCase";
import { AuthRepositoryImpl, CredentialRepositoryImpl } from '@/Data/Repository';
import style from "@/Presentation/Style/Login.module.css";

const Login = () => {
  const router = useRouter();
  const loginUseCase = new LoginUsecase(new AuthRepositoryImpl());
  const saveCredentialUseCase = new SaveCredentialUseCase(new CredentialRepositoryImpl());
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const idOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const pwdOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPwd(e.target.value);
  };
  const loginOnClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      setIsLoading(true);
      const data = await loginUseCase.execute(id, pwd);
      await saveCredentialUseCase.execute("accessToken", data.accessToken);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {(isLoading)? (
        <Spinner />
      ):(
        <></>
      )}
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
              children={"로그인"}
              imgsrc="#"
              onClick={loginOnClick}
            />
          </div>
        </div>
    </>
  );
};

export default Login;
