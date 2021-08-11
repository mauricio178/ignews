import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

interface PropsButtonSubscribe {
   priceId: string
}

export function ButtonSubscribe({priceId}: PropsButtonSubscribe) {

   

    return (
         <button className={styles.subcribeButton}>
            Me inscrever!
         </button>
        )
}