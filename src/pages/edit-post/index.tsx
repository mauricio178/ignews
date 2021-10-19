/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from './styles.module.scss'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from '../../components/Input'
import { FiEdit3, FiPlus, FiCheck, FiX, FiWatch, FiTag, FiBookOpen } from "react-icons/fi";
import { ContentEdit } from '../../components/ContentEdit';
import { useContent } from '../../hooks/useContentHook'
import { PostProps } from '../../hooks/postHook'
import { Carousel } from '../../components/Carouselimg'
import { usePost } from '../../hooks/postHook'

export type PostFormData = {
    title: string
    subtitle: string
    tags: string
    baner: any
    date?: Date
}

export default function CreatePost() {

    // const [title, setTitle] = useState<string>('');
    // const [subtitle, setSubtitle] = useState<string>('');
    // const [tags, setTags] = useState<string>('');
    const [baner, setBaner] = useState<HTMLImageElement>();

    // pegando a data atual (somente para visual de preview)
    var dataAtual = new Date()
    var dia = dataAtual.getDate()
    var mes = dataAtual.getMonth()
    var ano = dataAtual.getFullYear()
    var meses = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro')

    const { content, addC } = useContent()
    const { editPostInfo, updatePost, post } = usePost()

    function handleSaveChanges() {
        try {
            updatePost(post)

        } catch (err) {
            console.log("erro ao enviar", err)
        }
        alert("Post Editado!")
    }

    function handleSelectBaner(evt) {
        const thisLength = evt.target.files.length;
        if (thisLength === 0) {
            return;
        }
        editPostInfo("baner", evt.target.files[0])
    }

    function handleRemoveBaner() {
        setBaner(null);
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
                    <h2><FiEdit3 /> Editar Postagem Nº {post.id}</h2>
                </div>
                <div className={styles.formPost}>
                    <div>
                        <Input
                            placeholder="Título"
                            type="text"
                            value={post.title}
                            onchange={(e: string) => editPostInfo("title", e)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="Sub-Título"
                            type="text"
                            value={post.subtitle}
                            onchange={(e: string) => editPostInfo("subtitle", e)}
                            required
                        />
                    </div>
                    <div>
                        <p>Imagem de Capa da Postagem</p>
                        <input type="file" accept="image/*" onChange={handleSelectBaner} />
                        {
                            post.baner !== null && post.baner !== undefined &&
                            <button onClick={handleRemoveBaner}>Remover Baner</button>
                        }
                    </div>
                    <div>
                        <Input
                            placeholder="Tags da Postagem"
                            type="text"
                            value={JSON.stringify(post.tagsArray)}
                            onchange={(e: string) => editPostInfo("tags", e)}
                            required
                        />
                    </div>
                    <div className={styles.globalContent}>
                        {
                            content.map((data, k) => {
                                return (
                                    <div key={k}>
                                        <ContentEdit content={data.type} id={data.id} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={addC}>
                            <FiPlus size={24} /> Adicionar Conteúdo
                        </button>
                    </div>
                </div>

                <h2><FiBookOpen size={24} /> Preview da Postagem</h2>

                <div className={styles.preview}>
                    {
                        (post.baner !== null && post.baner !== undefined && post.baner !== {}) ?
                            <>
                                <article className={styles.previewHeader} style={{
                                    background: `url(${URL.createObjectURL(post.baner)}) center center rgba(0,0,0,0.7)`,
                                }}
                                >
                                    <h1>{post.title}</h1>
                                    <h2>{post.subtitle}</h2>
                                    <p><FiWatch size={18} /> Publicado em: <strong>{dia} de {meses[mes]} de {ano}</strong></p>
                                </article>
                                {
                                    content.map((data, k) => {
                                        return (
                                            <div key={k} className={styles.previewContent}>
                                                {
                                                    data.type === "Paragraph" &&
                                                    <div className={styles.paragraph}>
                                                        <p>{data.content}</p>
                                                    </div>
                                                }
                                                {
                                                    data.type === "Video" &&
                                                    <div className={styles.video}>
                                                        {
                                                            (data.content !== null && data.content !== undefined) &&
                                                            <>
                                                                {
                                                                    data.content.map((dataFile, k) => {
                                                                        return (
                                                                            <div key={k}>
                                                                                <video width="420" height="340" controls>
                                                                                    <source src={URL.createObjectURL(dataFile)} />
                                                                                </video>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                }
                                                {
                                                    data.type === "Foto" &&
                                                    <div className={styles.foto}>
                                                        {
                                                            (data.content !== null && data.content !== undefined) &&
                                                            <>
                                                                {
                                                                    data.content.map((dataFile, k) => {
                                                                        return (
                                                                            <div key={k}>
                                                                                <img src={URL.createObjectURL(dataFile)} alt={dataFile.name} />
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                }
                                                {
                                                    data.type === "Link" &&
                                                    <div className={styles.link}>
                                                        <a>{data.content}</a>
                                                    </div>
                                                    // <Link src={data.content}>{data.content}</Link>
                                                }
                                                {
                                                    data.type === "Carousel" &&
                                                    <div className={styles.carousel}>
                                                        {
                                                            (data.content !== null && data.content !== undefined) &&
                                                            <Carousel images={data.content} />
                                                        }

                                                    </div>
                                                }
                                                {
                                                    data.type === "Subtitle" &&
                                                    <div className={styles.subtitle}>
                                                        <h3>{data.content}</h3>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <div className={styles.tags}>
                                    <FiTag size={16} /> Tags:
                                    <ul>
                                        {
                                            post.tagsArray.map((item, k) => {
                                                return(
                                                    <li key={k}>
                                                        {item}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </>
                            :
                            <div className={styles.null}>
                                <p>Selecione uma Imagem de Capa Para ver O Preview da Postagem</p>
                            </div>
                    }

                </div>
                <button onClick={handleSaveChanges}>
                    <FiCheck size={24} /> Salvar Alterações
                </button>
            </main>
        </>
    )
}

