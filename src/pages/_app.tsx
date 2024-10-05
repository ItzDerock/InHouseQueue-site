import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css'; // Adjust to your styles if applicable

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G24C6G7TM3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G24C6G7TM3');`,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
