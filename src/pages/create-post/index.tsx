/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from './styles.module.scss'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from '../../components/Input'
import { FiEdit3, FiPlus, FiCheck, FiX, FiWatch, FiTag, FiBookOpen } from "react-icons/fi";
import { Content } from '../../components/Content';
import { ContentProps, useContent } from '../../hooks/useContentHook'
import { Carousel } from '../../components/Carouselimg'
import { url } from 'inspector'

export default function CreatePost(data: ContentProps) {

    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [tags, setTags] = useState<string>('');

    const [baner, setBaner] = useState<HTMLImageElement>();

    // pegando a data atual (somente para visual de preview)
    var dataAtual = new Date()
    var dia = dataAtual.getDate()
    var mes = dataAtual.getMonth()
    var ano = dataAtual.getFullYear()
    var meses = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro')

    const { addC, content, switchContent } = useContent()

    // tratando erros e inconsistências 21/09

    function handleSelectBaner(evt) {
        const thisLength = evt.target.files.length;
        if (thisLength === 0)
            return;
        setBaner(evt.target.files[0])
    }

    function handleRemoveBaner() {
        setBaner(undefined)
    }

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
                    <div>
                        <p>Imagem de Capa da Postagem</p>
                        <input type="file" accept="image/*" onChange={handleSelectBaner} />
                        {
                            baner !== null && baner !== undefined &&
                            <button onClick={handleRemoveBaner}>Remover Baner</button>
                        }
                    </div>
                    <div>
                        <Input
                            placeholder="Tags da Postagem"
                            type="text"
                            value={tags}
                            onchange={(e: string) => setTags(e)}
                            required
                        />
                    </div>
                    <div className={styles.globalContent}>
                        {
                            content.map((data, k) => {
                                return (
                                    <div key={k}>
                                        <Content content={data} id={data.id} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={addC}>
                            <FiPlus size={24} /> Adicionar Conteúdo
                        </button>
                        <button onClick={handleSendPost}>
                            <FiCheck size={24} /> Finalizar Postagem
                        </button>
                    </div>
                </div>

                <h2><FiBookOpen size={24}/> Preview da Postagem</h2>

                <div className={styles.preview}>
                    {
                        (baner !== null && baner !== undefined) ?
                            <>
                                <article className={styles.previewHeader} style={{
                                    background: `url(${URL.createObjectURL(baner)}) center center rgba(0,0,0,0.7)`,
                                    backgroundSize: 'cover'

                                }}
                                >
                                    <h1>{title}</h1>
                                    <h2>{subtitle}</h2>
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
                                    <p>
                                        <FiTag size={16} /> Tags: <span>{tags}</span>
                                    </p>
                                </div>
                            </>
                            :
                            <div className={styles.null}>
                                <p>Selecione uma Imagem de Capa Para ver O Preview da Postagem</p>
                            </div>
                    }

                </div>
            </main>
        </>
    )
}

