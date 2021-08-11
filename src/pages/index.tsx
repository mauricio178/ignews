/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { GetStaticProps } from 'next'
import { ButtonSubscribe } from '../components/ButtonSubscribe';
import styles from './home.module.scss'
import { stripe } from '../services/stripe';


interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}


export default function Home({product}: HomeProps) {
  
  return (
    <>
      <Head>
        <title>Home | IG-News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>
            👏 Olá, Bem-vindo!
          </span>
          <h1>Novidades sobre o mundo de <span>React</span> e <br/> 
          <span>React-Native</span> .</h1>
          <p>Adiquira já seu acesso e mantenha-se atualizado<br/>
          Apenas <span>{product.amount} por Ano </span>
          </p>
          <ButtonSubscribe priceId={product.priceId}/>
        </section>
        <img src="/images/img2.png" alt="codding" />
      </main>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JN0EADM77hknLOCadDNPV01')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return{
    props: {
      product,
    },
    revalidate: 60 * 60 * 24  // 24 Hours
  }
}