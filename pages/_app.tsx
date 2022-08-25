import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavBar from '../components/navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomNavBar />
      <Component {...pageProps} />

    </>
  );
}

export default MyApp
