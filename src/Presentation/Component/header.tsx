import { Logo, ProfileNormalImage } from "@/Presentation/Resource";
import { CheckCredentialUseCase } from '@/Domain/UseCase';
import { CredentialRepositoryImpl } from "@/Data/Repository";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import style from "@/Presentation/Style/Header.module.css";

const Header = () => {
  const router = useRouter();
  const checkCredentialUseCase = new CheckCredentialUseCase(new CredentialRepositoryImpl());
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const moveToMain = () => {
    router.push("/main");
  };

  const moveToMyPage = () => {
    router.push("/mypage");
  };
  useEffect(() => {
    const getInfo = async () => {
      try {
        const info = await checkCredentialUseCase.execute();
        setName(info.nickname);
        setIsLoading(false);
      }
      catch (error) {
        console.log(error);
        router.push("/");
      }
    }
    getInfo();
  }, []);

  return (
    <div className={style.Header}>
      <div className={style.logoBox} onClick={moveToMain}>
        <Image src={Logo} alt="logo" width={40} height={40} />
      </div>
      <div className={style.userBox}>
        <div className={style.myPage} onClick={moveToMyPage}>
          <Image
            src={ProfileNormalImage}
            alt="profile"
            width={32}
            height={32}
          />
          {(isLoading)?(
            <></>
          ) : (
            <p>{name} 님</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
