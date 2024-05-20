import { useRouter } from "next/router";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Header, Toast, Alert, Spinner } from '@/Presentation/Component';
import { GetTimeTableUseCase, SetTimeTableUseCase } from '@/Domain/UseCase';
import { CalenderRepositoryImpl, CredentialRepositoryImpl } from "@/Data/Repository";
import cn from 'classnames';

import style from '@/Presentation/Style/Everytime.module.css';
import '@fontsource/inter';

const Everytime = () => {
  const router = useRouter();
  const getTimeTableUseCase = new GetTimeTableUseCase(new CalenderRepositoryImpl());
  const setTimeTableUseCase = new SetTimeTableUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isSpinner, setIsSpinner] = useState(false);
  const [isFailToast, setIsFailToast] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  
  const idOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  }
  const passwordOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit: MouseEventHandler<HTMLDivElement> = async (e) => {
    if(id === "" || password === ""){
      setIsFailToast(true);
      return;
    }
    try {
      setIsSpinner(true);
      const data = await getTimeTableUseCase.execute(id, password);
      console.log(data);
      await setTimeTableUseCase.execute(data);
      setTimeout(() => {
        router.push('/main');
      }, 1000);
    } catch (error) {
      console.log(error)
      setIsSpinner(false);
      setIsFailToast(true);
    }
  }

  const handleCancel: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsAlert(true);
  }
  const haneldeAlertClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsAlert(false);
  }
  const handleAlertSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    router.push("/main");
  }
  return(
    <>
      {(isSpinner)? (
        <Spinner />
      ) : (<> </>)}
      {(isFailToast)? (
        <Toast 
          iconType="fail"
          title="실패"
          text="정보를 정확히 입력해주세요"
          isOpen={isFailToast}
          setIsOpen={setIsFailToast}
        />
      ) : (<></>)}
      {(isAlert)? (
        <Alert 
          title="정말로 삭제하시겠습니까?"
          text="개인정보 삭제시 시간표를 직접 등록해야합니다"
          alertOnClose={haneldeAlertClose}
          buttonOnClick={handleAlertSubmit}
        />
      ): (<></>)}
      <Header />
      <div className={style.ET}>
        <div className={style.ContentBox}>
          <div className={style.TextBox}>
            <h2 className={style.ContentTitle}>개인정보 입력하기</h2>
            <p>원할한 이용을 위해 에브리타임 계정을 등록해주세요</p>
            <p>시간표가 자동으로 고정된 일정에 등록됩니다 </p>
          </div>
          <input 
            className={style.Input}
            placeholder="아이디를 입력해주세요"
            onChange={idOnChange}
            value={id}
          />
          <input 
            className={style.Input}
            placeholder="비밀번호를 입력해주세요"
            onChange={passwordOnChange}
            value={password}
          />

          <div className={style.BtnBox}>
            <div 
              className={cn(style.SubmitBtn, style.Cancel)}
              onClick={handleCancel}
            >
              삭제하기
            </div>
            <div 
              className={cn(style.SubmitBtn, style.Save)}
              onClick={handleSubmit}
            >
              등록하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Everytime;