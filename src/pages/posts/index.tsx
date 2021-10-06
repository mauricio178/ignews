import Head from 'next/head'
import styles from './styles.module.scss'
import React, { useState } from 'react'
import { usePost } from '../../hooks/postHook'
import { useContent } from '../../hooks/useContentHook'

export default function Posts() {

    const { removePost } = usePost()
    
    const postInfo = JSON.parse(localStorage.getItem('dados'))

    return (
        <>
            <Head>
                <title>
                    Posts | IG-News
                </title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <ul>
                        {
                            postInfo.map((data, k) => {
                                return (
                                    <div key={k}>
                                        <li>
                                            <a>
                                                <p>{data.date} - Nº {data.id}</p>
                                                <h1>{data.title}</h1>
                                                <h3>{data.subtitle}</h3>
                                                <strong>{data.tags}</strong>
                                            </a>
                                        </li>
                                        <button onClick={() => removePost(data.id)}>Excluir Post</button>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            </main>
        </>
    )
}
