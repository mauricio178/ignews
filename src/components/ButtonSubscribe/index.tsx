import { useSession, signIn } from 'next-auth/client';
import React from 'react'
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface PropsButtonSubscribe {
   priceId: string
}

export function ButtonSubscribe({ priceId }: PropsButtonSubscribe) {

   const [session] = useSession();

   async function handleSubscribe() {

      if(!session){
         signIn('github')
         return;
      }

      try {
         const response = await api.post('/subscribe')

         const { sessionId } = response.data

         const stripe = await getStripeJs()

         await stripe.redirectToCheckout({ sessionId })
         
      } catch (err) {
         alert(err.message)
      }

   }

   return (
      <button
         className={styles.subcribeButton}
         onClick={handleSubscribe}
      >
         Me inscrever!
      </button>
   )
}