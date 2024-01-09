import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {useSearchParams} from "next/navigation";

const LoginCheck = () => {
  const router = useRouter();
  const param = useSearchParams();
  useEffect(()=>{
    const token = param.get('accessToken');

    if(token) {
      localStorage.setItem('accessToken', token);
      router.push('/main');
    }
  });

  return (
    <div>
    </div>
  );
};

export default LoginCheck;
