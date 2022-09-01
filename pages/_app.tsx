import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavBar from '../components/navbar';
import CSS from 'csstype'

function MyApp({ Component, pageProps }: AppProps) {
  const style: CSS.Properties = {
    marginRight: '15%',
    marginLeft: '15%',
    marginTop: '2rem'
  };

  return (
    <div>
      <CustomNavBar></CustomNavBar>
      <div style={style}>
        <Component {...pageProps} ></Component>
      </div>

    </div>
  );
}

export default MyApp
