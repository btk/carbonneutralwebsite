import { NextUIProvider, createTheme } from '@nextui-org/react';
import '../styles/globals.css'

import { DM_Sans } from '@next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
})

const theme = createTheme({
    type: 'light',
    theme: {
      colors: {
        gradient: 'linear-gradient(112deg, $green900 -25%, $green700 -20%, $green800 80%)'
      },
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
