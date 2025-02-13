/// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add Favicon */}
          <link rel="icon" href="https://i.ibb.co/vxKbKLHT/photo.jpg" />
          <link rel="apple-touch-icon" href="https://i.ibb.co/vxKbKLHT/photo.jpg" />
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
