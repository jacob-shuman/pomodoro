import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import withTwindDocument from "@twind/next/document";
import twindConfig from "../../twind.config";
import { tw } from "twind";

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html
        lang="en"
        style={{ height: "100%", width: "100%", margin: 0, overflow: "hidden" }}
      >
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap"
            rel="stylesheet"
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

export default withTwindDocument(twindConfig, Document);
