import { ReactNode, MouseEventHandler } from 'react';
type DialogProps = {
  dialogChildren: ReactNode;
  onClose: MouseEventHandler<HTMLDivElement>;
}

export type { DialogProps };