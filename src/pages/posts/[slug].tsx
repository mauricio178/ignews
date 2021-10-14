import Link from 'next/link'
import Head from 'next/head'
import styles from './post.module.scss'
import { PostProps } from '../../hooks/postHook'


export default function Post( ) {

    return (
        <>
            <Head>
                <title></title>
            </Head>

            <main className={styles.container}>
                    <h1>SLUG</h1>
            </main> 


        </>
    )
}