import { useEffect } from "react";
import { useRouter } from "next/router";

import { useSearchParams } from "next/navigation";

const LoginCheck = () => {
  const router = useRouter();
  const param = useSearchParams();
  useEffect(() => {
    const accessToken = param.get("accessToken");
    const refreshToken = param.get("refreshToken");
    const userData = localStorage.getItem("userId");
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (userData) {
        router.push("/main");
      } else {
        router.push("/add");
      }
    } else {
      router.push('/');
    }
  });

  return <div></div>;
};

export default LoginCheck;
