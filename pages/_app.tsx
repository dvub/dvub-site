import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/navbar';
import CSS from 'csstype'
import Footer from '../components/footer';

function MyApp({ Component, pageProps }: AppProps) {


  const footerHeight = '4rem';

  const style: CSS.Properties = {

    marginRight: '6rem',
    marginLeft: '6rem',
    marginTop: '2rem',
    paddingBottom: footerHeight,
  };
  const footerStyle: CSS.Properties = {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: footerHeight,        /* Footer height */
    fontFamily: 'Overpass Mono',
    textAlign: 'center',
    lineHeight: footerHeight,
  }
  const wrapperStyle: CSS.Properties = {
    position: 'relative',
    minHeight: '100vh',

  }

  return (

    <div style={wrapperStyle}>
      <NavBar />
      <div style={style}>
        <Component {...pageProps} ></Component>
      </div>
      <div style={footerStyle}>
        <Footer />
      </div>
    </div>
  );
}

export default MyApp
