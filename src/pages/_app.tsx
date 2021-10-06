import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { PostProvider } from '../hooks/postHook';
import { ContentProvider } from '../hooks/useContentHook';

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostProvider>
      <ContentProvider>
        <Header />
        <Component {...pageProps} />
      </ContentProvider>
    </PostProvider>
  )
}

export default MyApp