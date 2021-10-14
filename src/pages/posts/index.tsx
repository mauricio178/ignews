/* eslint-disable @next/next/link-passhref */
import Head from 'next/head'
import styles from './styles.module.scss'
import React, { useEffect, useState } from 'react'
import { FiCalendar, FiEdit, FiTrash2 } from "react-icons/fi";
import { usePost } from '../../hooks/postHook'
import Link from 'next/link'

export default function Posts() {

    const { removePost, editPost } = usePost()

    const postList = JSON.parse(localStorage.dados)

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
                            (postList !== null && postList !== undefined && postList.length >= 1) ?
                                <>
                                    {
                                        postList.map((data, k) => {

                                            return (
                                                <div key={k} className={styles.listPost}>

                                                    <Link href={`posts/${data.title}`}>
                                                        <li>
                                                            <a>
                                                                <p><FiCalendar size={18}/> {data.date[0]} / {data.date[1]} / {data.date[2]} - Nº {data.id}</p>
                                                                <h1>{data.title}</h1>
                                                                <h3>{data.subtitle}</h3>
                                                                <strong>{data.tags}</strong>
                                                                {/* <p>{data.content}</p> */}
                                                            </a>
                                                        </li>
                                                    </Link>
                                                    <div className={styles.buttons}>
                                                        <Link href={`/edit-post`}>
                                                            <button
                                                                className={styles.buttonEdit}
                                                                onClick={() => editPost(data)}
                                                            >
                                                                <FiEdit size={18} />
                                                            </button>
                                                        </Link>
                                                        <button
                                                            className={styles.buttonDelete}
                                                            onClick={() => removePost(data.id)}
                                                        >
                                                            <FiTrash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                                :
                                <div>
                                    <h1>You dont have any Posts Here</h1>
                                </div>
                        }
                    </ul>
                </div>
            </main>
        </>
    )
}
