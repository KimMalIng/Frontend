import { MouseEventHandler, useState } from 'react';
import cn from 'classnames';
import * as D from '@radix-ui/react-dialog';
import { DialogProps } from '@/Presentation/Type';

import style from '@/Presentation/Style/Dialog.module.css';

const Dialog = ({
  dialogChildren,
  onClose
}: DialogProps) => {

  return(
    <D.Root open>
      <D.Portal>
        <D.Overlay className={style.DialogOverlay}></D.Overlay>
        <D.Content className={style.DialogContent}>
          {dialogChildren}
          <div className={style.btnBox}>
            <div className={cn(style.btn, style.save)}>확인하기</div>
            <div 
              className={cn(style.btn, style.unsave)}
              onClick={onClose}
            >
              닫기
            </div>
          </div>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}

export default Dialog;