import { InputProps } from '@/Presentation/Type';

import style from '@/Presentation/Style/Input.module.css';

const Input = ({
  width,
  height,
  text,
  placeHolder,
  fontSize,
  onChange
}: InputProps) => {
  return(
    <input
      className={style.Input}
      placeholder={placeHolder}
      value={text}
      style={{
        width,
        height,
        fontSize,
      }}
      onChange={onChange}
    />
  );
}

export default Input;