import { HashLoader } from 'react-spinners';

import style from '@/Presentation/Style/Spinner.module.css';

const Spinner = () => {
  return(
    <div className={style.Spinner}>
      <HashLoader
        color='#36d7b7'
        size='85'
      />
    </div>
  );
}

export default Spinner;