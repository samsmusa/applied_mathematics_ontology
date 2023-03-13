import React, { FC } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Box, CircularProgress, CssBaseline } from "@mui/material";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache } from "@/utils";
import { MUIProvider } from "@/providers";
import "slick-carousel/slick/slick.css";
import "@/styles/globals.css";
import "@/styles/react-slick.css";
import { NextPageWithLayout } from "@/interfaces/layout";
import { useRouter } from "next/router";

const clientSideEmotionCache = createEmotionCache();

type AppPropsWithLayout = AppProps & {
  emotionCache: EmotionCache;
  Component: NextPageWithLayout;
};

function App(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (router.isReady) {
      setLoading(false);
    }
  }, [router.isReady]);

  return (
    <CacheProvider value={emotionCache}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <title>React Coursespace</title>
          </Head>
          <MUIProvider>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </MUIProvider>
        </>
      )}
    </CacheProvider>
  );
}

export default App;
