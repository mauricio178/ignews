import Head from 'next/head'
import styles from './styles.module.scss'
import React, { useState } from 'react'
import { Input } from '../../components/Input'
import { FiEdit3, FiPlus, FiCheck } from "react-icons/fi";
import { Example } from '../../components/Content';


export default function CreatePost() {

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
                        <h3>Título da Postagem</h3>
                        <Input />
                    </div>
                    <div>
                        <h3>Sub-Título</h3>
                        <Input />
                    </div>
                    <div className={styles.globalContent}>
                        <Example />
                    </div>
                    <div>
                        <button>
                            <FiPlus size={24} /> Adicionar Conteúdo
                        </button>
                        <button>
                            <FiCheck size={24} /> Finalizar Postagem
                        </button>
                    </div>
                </div>

                <h2>Preview da Postagem</h2>
                <div className={styles.preview}>
                    <div>
                        <h1>~title~</h1>
                        <p>~content~</p>
                    </div>
                </div>
            </main>
        </>
    )
}