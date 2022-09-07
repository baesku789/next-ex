import Document, { Html, Head, NextScript, Main, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import React from 'react';
import ESI from './ESI';
import { initialize } from 'next/client';

class MyDocument extends Document {
	static async getInitialProps(ctx:DocumentContext){
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			// Run the React rendering logic synchronously
			ctx.renderPage = () =>
				originalRenderPage({
					// Useful for wrapping the whole react tree
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props}/>)
				})

			// Run the parent `getInitialProps`, it now includes the custom `renderPage`
			const initialProps = await Document.getInitialProps(ctx)

			return {
				...initialProps,
				styles:[initialProps.styles, sheet.getStyleElement()]
			}

		} catch(e) {
			// 실패시 styled-components를 포함하지 않고 initialProps를 반환
			if(e instanceof Error){
				console.error(e.message)
				const initialProps = await Document.getInitialProps(ctx)
				return {
					...initialProps
				}
			}
		} finally {
			sheet.seal()
		}
	}

	render() {
		return (
			<Html lang={'ko'}>
				<Head>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
					/>
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
