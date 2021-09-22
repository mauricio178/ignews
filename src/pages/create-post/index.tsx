import Head from 'next/head'
import styles from './styles.module.scss'
import React, { useEffect, useState } from 'react'
import { Input } from '../../components/Input'
import { FiEdit3, FiPlus, FiCheck, FiX } from "react-icons/fi";
import { Content } from '../../components/Content';

import useContentHooks from '../../hooks/useContentHook'



// type Post = {
//     title: string
//     subtitle: string
// }




export default function CreatePost() {

    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');

    // change for hooks 22/09

    const { adcContent, content } = useContentHooks()

    // tratando erros e inconsistências 21/09

    function handleSendPost() {
        if (title == '' || title.length < 5) {
            alert("Porfavor, insira um Titulo válido!");
            return false
        } 
        if (subtitle == '' || subtitle.length < 5) {
            alert("Porfavor, insira um Subtítulo");
            return false
        }
    }

    return (
        <>
            <Head>
                <title>
                    New Post | IG-News
                </title>
            </Head>

            <main className={styles.container}>
                <div className={styles.title}>
                    <h2><FiEdit3 /> Escrever Nova Postagem</h2>
                </div>
                <div className={styles.formPost}>
                    <div>
                        <Input
                            placeholder="Título"
                            type="text"
                            value={title}
                            onchange={(e: string) => setTitle(e)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="Sub-Título"
                            type="text"
                            value={subtitle}
                            onchange={(e: string) => setSubtitle(e)}
                            required
                        />
                    </div>
                    <div className={styles.globalContent}>
                        {
                            content.map((data, k) => {
                                return (
                                    <Content key={k} id={data.id} />
                                )
                            })
                        }
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={adcContent}>
                            <FiPlus size={24} /> Adicionar Conteúdo
                        </button>
                        <button onClick={handleSendPost}>
                            <FiCheck size={24} /> Finalizar Postagem
                        </button>
                    </div>
                </div>

                <h2>Preview da Postagem</h2>
                <div className={styles.preview}>
                    <div>
                        <h1>{title}</h1>
                        <h3>{subtitle}</h3>
                        <p>~~paragraph~~</p>
                    </div>
                </div>
            </main>
        </>
    )
}

