import { MouseEventHandler } from "react";
import { Button } from "@/Presentation/Component";
import Image from "next/image";
import { Logo, Kakao, Naver } from "@/Presentation/Resource";

import style from "@/Presentation/Style/Splash.module.css";

const Splash = () => {
  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {};

  return (
    <div className={style.Splash}>
      <div className={style.ContentBox}>
        <div className={style.ServiceBox}>
          <Image src={Logo} alt="로고 이미지" width={190} />
          <h2>너 P야?</h2>
        </div>
        <div className={style.ButtonBox}>
          <Button
            width="440px"
            height="46px"
            fontSize="18px"
            backgroundColor="#49A078"
            color="#FFF"
            children={"로그인"}
            imgsrc="#"
            onClick={onClick}
          />
          <Button
            width="440px"
            height="46px"
            fontSize="18px"
            backgroundColor="#49A078"
            color="#FFF"
            children={"가입하기"}
            imgsrc="#"
            onClick={onClick}
          />
          <div className={style.CustomBtnBox}>
            <div className={style.CustomBtn}>
              <Image src={Kakao} alt={"카카오 이미지"} width={200} />
            </div>

            <div className={style.CustomBtn}>
              <Image src={Naver} alt={"네이버 이미지"} width={200} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
