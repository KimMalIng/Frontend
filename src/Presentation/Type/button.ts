import { MouseEventHandler } from 'react';

type ButtonProps = {
  height: string;
  width: string;
  fontSize: string;
  backgroundColor: string;
  color: string;
  children: string;
  imgsrc: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type { ButtonProps };
