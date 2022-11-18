import { NextUIProvider, createTheme } from '@nextui-org/react';

import { DM_Sans } from '@next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = DM_Sans({
    weight: ['400', '500', '700'],
})

const theme = createTheme({
    type: 'light',
    theme: {
        fonts: {
            sans: inter.style.fontFamily,
            serif: inter.style.fontFamily,
        },
    },
})

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
