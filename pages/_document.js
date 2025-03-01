import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
