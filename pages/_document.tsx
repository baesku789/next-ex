import Document, { Html, Head, NextScript, Main, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import React from 'react';
import ESI from './ESI';

class MyDocument extends Document {
	static async getInitialProps(ctx:DocumentContext){
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props}/>)
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles:[initialProps.styles, sheet.getStyleElement()]
			}

		} catch(e) {
			if(e instanceof Error){
				console.error(e.message)
			}
		} finally {
			sheet.seal()
		}
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
					/>
					<title></title>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
