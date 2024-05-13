import { useState } from "react";
import { ProfileNormalImage } from "@/Presentation/Resource";
import { Button, Header, Spinner } from "@/Presentation/Component";
import Image from "next/image";
import { useRouter } from "next/router";
import { SaveCredentialUseCase, CheckCredentialUseCase } from '@/Domain/UseCase';
import { CredentialRepositoryImpl } from "@/Data/Repository";

import style from "@/Presentation/Style/MyPage.module.css";

const MyPage = () => {
  const router = useRouter();
  const saveCredentialUseCase = new SaveCredentialUseCase(new CredentialRepositoryImpl());
  const checkCredentialUseCase = new CheckCredentialUseCase(new CredentialRepositoryImpl()); 
  const [name, setName] = useState("");
  const [isSpinnerOpen, setIsSpinnerOpen] = useState(false);
  const logout = async () => {
    setIsSpinnerOpen(true);
    await saveCredentialUseCase.execute("accessToken", "");
    setTimeout(() => {
      router.push("/");
      setIsSpinnerOpen(false);
    }, 1000);
  };
  const fixUserData = () => {
    console.log("try to fix!");
    alert("still not ready yet...");
  };
  const fixUserImage = () => {
    console.log("try to fix!");
    alert("Not ready yet...");
  };

  const openTerms = () => {
    alert("Not ready yet...");
  };

  const deleteUser = () => {
    alert("Not ready yet...");
  };

  const getInfo = async () => {
    console.log("hi")
    try {
      const info = await checkCredentialUseCase.execute();
      console.log(info)
      setName(info.name);
    }
    catch (error) {
      console.log(error);
      router.push("/");
    }
  }
  getInfo();
  return (
    <>
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
            <p>{name} 님</p>
          </div>
          <div className={style.Functions}>
            <Button
              width="200px"
              height="40px"
              fontSize="14px"
              backgroundColor="#49A078"
              color="#FFF"
              children={"정보 수정"}
              imgsrc="#"
              onClick={fixUserData}
            />
            <Button
              width="200px"
              height="40px"
              fontSize="14px"
              backgroundColor="#49A078"
              color="#FFF"
              children={"로그아웃"}
              imgsrc="#"
              onClick={logout}
            />
          </div>
          <div className={style.etcData}>
            <p onClick={openTerms}>
              <u>이용약관</u>
            </p>
            <p onClick={deleteUser}>
              <u>회원 탈퇴</u>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
