import type { AppProps } from 'next/app';
import AuthProvider from '../src/store/authProvider';
import DataProvider from '../src/store/dataProvider';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DataProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default MyApp;
