import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { ContentProvider } from '../hooks/useContentHook';

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContentProvider>
      <Header />
      <Component {...pageProps} />
    </ContentProvider>
  )
}

export default MyApp