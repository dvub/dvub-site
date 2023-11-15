import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from '../components/Navbar'
import CSS from 'csstype'
import { Analytics } from '@vercel/analytics/react'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
	const footerHeight = '4rem'
	const margins = '5%'
	const style: CSS.Properties = {
		marginRight: margins,
		marginLeft: margins,
		marginTop: '2rem',
		paddingBottom: footerHeight,
	}
	const footerStyle: CSS.Properties = {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: footerHeight,
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
			<Analytics />
			<NavBar />
			<div style={style}>
				<Component {...pageProps}></Component>
			</div>
			<div style={footerStyle}>
				<Footer />
			</div>
		</div>
	)
}

export default MyApp
