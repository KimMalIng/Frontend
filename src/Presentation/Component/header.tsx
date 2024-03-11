import { Logo, ProfileNormalImage } from "@/Presentation/Resource";
import Image from "next/image";

import style from "@/Presentation/Style/Header.module.css";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const moveToMain = () => {
    router.push("./main");
    console.log("push to main");
  };

  const moveToMyPage = () => {
    router.push("./mypage");
    console.log("push to myPage");
  };

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
          <p>이장훈 님</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
