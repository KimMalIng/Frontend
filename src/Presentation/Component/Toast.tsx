import * as T from '@radix-ui/react-toast';
import { useState } from 'react';
import { ToastProps } from '@/Presentation/Type';

import style from '@/Presentation/Style/Toast.module.css';

const Toast = ({
  title,
  isOpen,
  setIsOpen
}: ToastProps) => {
  return(
    <>
      <T.Root 
        className={style.ToastRoot}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <T.ToastTitle className={style.ToastTitle}>{title}</T.ToastTitle>
      </T.Root>
      <T.Viewport className={style.ToastViewport} />
    </>
  );
};

export default Toast;