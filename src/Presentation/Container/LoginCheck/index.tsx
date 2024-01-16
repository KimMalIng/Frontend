import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {useSearchParams} from "next/navigation";

const LoginCheck = () => {
  const router = useRouter();
  const param = useSearchParams();
  useEffect(()=>{
    const accessToken = param.get('accessToken');
    const refreshToken = param.get('refreshToken');

    if(accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/main');
    }
  });

  return (
    <div>
    </div>
  );
};

export default LoginCheck;
