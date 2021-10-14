import { useSession, signIn } from 'next-auth/client';
import React from 'react'
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface PropsButtonSubscribe {
   priceId: string
}

export function ButtonSubscribe({ priceId }: PropsButtonSubscribe) {

   const [session] = useSession();

   async function handleSubscribe() {

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