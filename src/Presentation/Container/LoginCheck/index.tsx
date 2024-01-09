import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LoginCheck = () => {
  const router = useRouter();
  useEffect(()=>{
    const token = router.query.token as string | undefined;
    const refreshToken = router.query.refreshToken as string | undefined;

    if(token && refreshToken) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/main');
    }
  },[router.query.token, router.query.refreshToken]);

  return (
    <div>
    </div>
  );
};

export default LoginCheck;
