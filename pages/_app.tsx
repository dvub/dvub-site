import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavBar from '../components/navbar';
import CSS from 'csstype'

function MyApp({ Component, pageProps }: AppProps) {
  const style: CSS.Properties = {
<<<<<<< Updated upstream
    marginRight: '15%',
    marginLeft: '15%',
    marginTop: '2rem'
=======
    marginRight: '6rem',
    marginLeft: '6rem',
    marginTop: '2rem',
    paddingBottom: '4rem',
>>>>>>> Stashed changes
  };
  const footerStyle: CSS.Properties = {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '4rem',          /* Footer height */
    fontFamily: 'Overpass Mono',
    textAlign: 'center',
    lineHeight: '4rem',
  }
  const wrapperStyle: CSS.Properties = {
    position: 'relative',
    minHeight: '100vh',

  }

  return (
<<<<<<< Updated upstream
    <div>
      <CustomNavBar></CustomNavBar>
      <div style={style}>
        <Component {...pageProps} ></Component>
      </div>

=======
    <div style={wrapperStyle}>
      <NavBar />
      <div style={style}>
        <Component {...pageProps} ></Component>
      </div>
      <div style={footerStyle}>
        <Footer />
      </div>
>>>>>>> Stashed changes
    </div>
  );
}

export default MyApp
