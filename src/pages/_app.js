import Head from "next/head";
import { useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const account = localStorage.getItem("userId");
    if (account) {
      console.log("berhasil");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <SnackbarProvider maxSnack={3}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Material Kit Pro</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </SnackbarProvider>
  );
};

export default App;
