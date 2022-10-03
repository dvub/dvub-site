import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/navbar';
import CSS from 'csstype'
import Footer from '../components/footer'
function MyApp({ Component, pageProps }: AppProps) {

  const style: CSS.Properties = {
    marginRight: '6rem',
    marginLeft: '6rem',
    marginTop: '2rem'
  };

  return (
    <div className='page-container'>
      <NavBar />
      <div style={style} className='content-wrap'>
        <Component {...pageProps} ></Component>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
}

export default MyApp
