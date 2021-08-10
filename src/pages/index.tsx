/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | IG-News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>
            👏 Hey, Welcome!
          </span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get acess to all the publications<br/>
          <span>for R$9,90 Month</span>
          </p>
        </section>
        <img src="/images/img2.png" alt="codding" />
      </main>

    </>
  )
}