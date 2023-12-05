import { useEffect } from 'react'
import { AuthModel, CalenderModel } from '@/Presentation/Model';

const Test = () => {
  const authModel = new AuthModel();
  const calenderModel = new CalenderModel();

  // const signup = async () =>{
  //   await authModel.signUp();
  // }

  const getC = async () =>{
    await calenderModel.getCalender();
  }


  useEffect(() => {
    getC();
  }, []);
  return(
    <></>
  );
}

export default Test;