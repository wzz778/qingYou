// 这个四个属性是必须的
import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="react next demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="hy-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
