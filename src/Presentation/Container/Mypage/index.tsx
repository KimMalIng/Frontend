import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { ProfileNormalImage } from "@/Presentation/Resource";
import { Dialog, Header, Spinner, Input, Alert, Toast } from "@/Presentation/Component";
import Image from "next/image";
import { useRouter } from "next/router";
import { SaveCredentialUseCase, CheckCredentialUseCase, DeleteUserUseCase, UpdateUserUseCase } from '@/Domain/UseCase';
import { CredentialRepositoryImpl, UserRepositoryImpl } from "@/Data/Repository";
import * as D from '@radix-ui/react-dialog';
import { Cross1Icon } from "@radix-ui/react-icons";

import style from "@/Presentation/Style/MyPage.module.css";
import '@fontsource/inter';

const MyPage = () => {
  const router = useRouter();
  const saveCredentialUseCase = new SaveCredentialUseCase(new CredentialRepositoryImpl());
  const checkCredentialUseCase = new CheckCredentialUseCase(new CredentialRepositoryImpl()); 
  const deleteUserUseCase = new DeleteUserUseCase(new UserRepositoryImpl(), new CredentialRepositoryImpl());
  const updateUserUseCase = new UpdateUserUseCase(new UserRepositoryImpl(), new CredentialRepositoryImpl());
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [pw, setPw] = useState("");
  const [nn, setNN] = useState(""); 
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [isSpinnerOpen, setIsSpinnerOpen] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [isNicknameChange, setIsNickNameChange] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const logout: MouseEventHandler<HTMLDivElement> = async () => {
    setIsSpinnerOpen(true);
    await saveCredentialUseCase.execute("accessToken", "");
    setTimeout(() => {
      router.push("/");
      setIsSpinnerOpen(false);
    }, 1000);
  };
  const handleDeleteUser: MouseEventHandler<HTMLParagraphElement> = async () => {
    setIsAlert(true);
  };
  const handleEditNickName: MouseEventHandler<HTMLDivElement> = () => {
    setIsNickNameChange(true);
  }
  const handleEditNickNameClose: MouseEventHandler<SVGAElement> = () => {
    setIsNickNameChange(false);
  }
  const handleNickName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNN(e.target.value);
  }
  const handleEditPassword: MouseEventHandler<HTMLDivElement> = () => {
    setIsPasswordChange(true);
  }
  const handleEditPasswordClose: MouseEventHandler<SVGAElement> = () => {
    setIsPasswordChange(false);
  }
  const handlePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  }
  const handleCheckPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCheckPassword(e.target.value);
  }
  const handleAlertClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsAlert(false);
  }
  const handleAlertSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      await deleteUserUseCase.execute(id);
    } catch (error) {
      console.log(error);
    }
    setIsAlert(false);
  }
  const handleNameUpdate: MouseEventHandler<HTMLDivElement> = async (e) => {
    try {
      await updateUserUseCase.execute(id, pw, name, nn);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  }
  const handlePasswordUpdate: MouseEventHandler<HTMLDivElement> = async (e) => {
    try {
      if(password !== checkPassword) {
        setIsToast(true);
        return;
      }
      await updateUserUseCase.execute(id, password, name, nickName);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const fixUserImage = () => {
    console.log("try to fix!");
    alert("Not ready yet...");
  };

  const getInfo = async () => {
    try {
      const info = await checkCredentialUseCase.execute();
      setId(info.memberId);
      setPw(info.memberPw);
      setNickName(info.nickname);
      setName(info.name);
    }
    catch (error) {
      console.log(error);
      router.push("/");
    }
  }
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      {(isToast)? (
        <Toast 
          iconType="fail"
          title="실패"
          text="비밀번호가 일치하지 않습니다"
          isOpen={isToast}
          setIsOpen={setIsToast}
        />
      ) : (
        <></>
      )}
      {(isAlert)? (
        <Alert 
          title="정말로 탈퇴하시겠습니까?"
          text="탈퇴시 복구는 불가능합니다."
          alertOnClose={handleAlertClose}
          buttonOnClick={handleAlertSubmit}
        />
      ) : (
        <></>
      )}
      {(isNicknameChange)? (
        <Dialog 
          dialogChildren={
              <div className={style.Dialog}>
              <div
                className={style.DialogTitle}
              >
                닉네임 변경하기
                <D.DialogClose>
                  <Cross1Icon 
                    onClick={handleEditNickNameClose}
                  />
                </D.DialogClose>
              </div>
              <Input
                type="id"
                width="100%"
                height="36px"
                text={nn}
                fontSize="14px"
                placeHolder={"닉네임을 입력해주세요"}
                onChange={handleNickName}
              />
              <div 
                className={style.DialogSubmitBtn}
                onClick={handleNameUpdate}
              >
                변경하기
              </div>
          </div>
        }
        />
      ) : (<></>)}
      {(isPasswordChange)? (
        <Dialog 
          dialogChildren={
            <div className={style.Dialog}>
              <div
                className={style.DialogTitle}
              >
                비밀번호 변경하기
                <D.DialogClose>
                  <Cross1Icon 
                    onClick={handleEditPasswordClose}
                  />
                </D.DialogClose>
              </div>
              <Input
                type="id"
                width="100%"
                height="36px"
                text={password}
                fontSize="14px"
                placeHolder={"비밀번호를 입력해주세요"}
                onChange={handlePassword}
              />
              <Input
                type="id"
                width="100%"
                height="36px"
                text={checkPassword}
                fontSize="14px"
                placeHolder={"비밀번호를 한번 더 입력해주세요"}
                onChange={handleCheckPassword}
              />
              <div 
                className={style.DialogSubmitBtn}
                onClick={handlePasswordUpdate}
              >
                변경하기
                </div>
            </div>
          }
        />
      ) : (<></>)}
      {(isSpinnerOpen)? ( <Spinner /> ) : (<></>)}
      <div className={style.Main}>
        <Header />
        <div className={style.ContentBox}>
          <div className={style.UserData} onClick={fixUserImage}>
            <Image
              src={ProfileNormalImage}
              alt="profile"
              width={150}
              height={150}
            />
            <p className={style.Name}>{nickName} 님</p>
          </div>
          <div className={style.Functions}>
            <div 
              className={style.MyPageBtn}
              onClick={handleEditPassword}
            >
              비밀번호 변경
            </div>
            <div 
              className={style.MyPageBtn}
              onClick={handleEditNickName}
            >
              닉네임 변경
            </div>
            <div 
              className={style.MyPageBtn}
              onClick={logout}  
            >
              로그아웃
            </div>
          </div>
          <div className={style.etcData}>
            <p>
              <u>이용약관</u>
            </p>
            <p onClick={handleDeleteUser}>
              <u>회원 탈퇴</u>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
