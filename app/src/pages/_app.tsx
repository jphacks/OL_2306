import { AppProvider } from '@/application/providers/AppProvider';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  
  return <AppProvider>
    <Component {...pageProps} />
  </AppProvider>;
}
