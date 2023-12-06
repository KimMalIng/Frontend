import { Logo, ProfileNormalImage } from '@/Presentation/Resource';
import Image from 'next/image'

import style from '@/Presentation/Style/Header.module.css';

const Header = () => {
  return(
    <div className={style.Header}>
      <div className={style.logoBox}>
        <Image 
          src={Logo} 
          alt="logo" 
          width={40} 
          height={40}
        />
      </div>
      <div className={style.userBox}>
        <Image 
          src={ProfileNormalImage}
          alt="profile"
          width={32}
          height={32}
        />
        <p>이장훈님</p>

        <div className={style.logout}>
          로그아웃
        </div>
      </div>
    </div>
  );
}

export default Header;