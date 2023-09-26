import type { AppProps } from 'next/app';
import './global.css';
import { Provider } from 'react-redux';
import { store } from '@/Presentation/Redux';
import '@radix-ui/themes/styles.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;