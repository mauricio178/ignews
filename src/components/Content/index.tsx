/* eslint-disable @next/next/no-img-element */
import React, { useState, SetStateAction } from 'react'
import styles from './styles.module.scss'
import { FiCheck, FiX } from "react-icons/fi";
import { RiVideoAddLine, RiVideoFill, RiImageAddLine, RiImage2Line } from "react-icons/ri";
import { Input } from '../Input';
import { Carousel } from '../Carouselimg';
import useContentHook from '../../hooks/useContentHook';


export function Content({ id }: any) {

    const [selectValue, setSelectValue] = useState(1);
    const [paragraph, setParagraph] = useState<string>('');
    const [subtitleContent, setSubtitleContent] = useState<string>('');
    const [link, setLink] = useState<string>('');

    const { removeContent } = useContentHook()

    const list = [
        { id: 1, name: '--' },
        { id: 2, name: 'Parágrafo' }, // string
        { id: 3, name: 'Video' },
        { id: 4, name: 'Foto' },
        { id: 5, name: 'Link' },
        { id: 6, name: 'Carousel de Imagens' }, //build type for all 
        { id: 7, name: 'Subtítulo' }, // string
    ];



    function handleSendParagraph() {
        console.log({ paragraph })
    }

    function handleSendVideo() {
        console.log("video enviado")
    }

    function handleSendFoto() {
        console.log("foto enviada")
    }

    function handleSendLink() {
        console.log({ link })
    }

    function handleSendCarousel() {
        console.log("carousel enviado")
    }

    function handleSendSubtitleContent() {
        console.log({ subtitleContent })
    }

    return (
        <div className={styles.container}>
            <div>
                <p>Selecione o tipo de Conteúdo </p>
            </div>

            <div className={styles.selectRow}>
                <select value={selectValue} onChange={(e: any) => setSelectValue(e.target.value)}>
                    {
                        list.map((item, k) => (
                            <option key={k} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            <div id={`content${id}`} className={styles.content}>
                {
                    selectValue == 1 &&
                    <>
                        <button onClick={removeContent}>
                            <FiX size={24} /> Remover Item
                        </button>
                        <div className={styles.none}><p>- selecione uma opção -</p></div>
                    </>
                }
                {
                    selectValue == 2 &&
                    <>
                        <textarea
                            value={paragraph}
                            onChange={(text) => setParagraph(text.target.value)}
                            placeholder="Insira o Parágrafo"
                            required
                        />
                        <button onClick={handleSendParagraph}>
                            <FiCheck size={24} /> Adicionar Parágrafo á Postagem
                        </button>
                        <button onClick={removeContent}>
                            <FiX size={24} /> Remover Item
                        </button>
                    </>
                }
                {
                    selectValue == 3 &&
                    <>
                        <div className={styles.video}>
                            <button>
                                Inserir Video<RiVideoAddLine size={28} />
                            </button>
                            <div>
                                <p>
                                    <RiVideoFill size={72} />
                                </p>
                            </div>
                        </div>
                        <button onClick={handleSendVideo}>
                            <FiCheck size={24} /> Adicionar Video a Postagem
                        </button>
                        <button onClick={removeContent}>
                            <FiX size={24} /> Remover Item
                        </button>
                    </>
                }
                {
                    selectValue == 4 &&
                    <>
                        <div className={styles.foto}>
                            <button>
                                Inserir Imagem - <RiImageAddLine size={28} />
                            </button>
                            <div>
                                <p>
                                    <RiImage2Line size={72} />
                                </p>
                            </div>
                        </div>
                        <button onClick={handleSendFoto}>
                            <FiCheck size={24} /> Adicionar Imagem a Postagem
                        </button>
                        <button onClick={removeContent}>
                            <FiX size={24} /> Remover Item
                        </button>
                    </>
                }
                {
                    selectValue == 5 &&
                    <>
                        <div className={styles.link}>
                            <Input
                                placeholder="Example: https://www.example.com.br"
                                type="text"
                                value={link}
                                onchange={(e: string) => setLink(e)}
                                required
                            />
                        </div>
                        <button onClick={handleSendLink}>
                            <FiCheck size={24} /> Adicionar Link a Postagem
                        </button>
                        <button onClick={removeContent}>
                            <FiX size={24} /> Remover Item
                        </button>
                    </>
                }
                {
                    selectValue == 6 &&
                    <>
                        <div className={styles.carousel}>
                            <Carousel />
                        </div>
                        <button onClick={handleSendCarousel}>
                            <FiCheck size={24} /> Adicionar Carousel a Postagem
                        </button>
                        <button onClick={removeContent}>
                            <FiX size={24} /> Remover Item
                        </button>
                    </>
                }
                {
                    selectValue == 7 &&
                    <>
                        <div className={styles.subtitleContent}>
                            <Input
                                placeholder="Subtítulo"
                                type="text"
                                value={subtitleContent}
                                onchange={(e: string) => setSubtitleContent(e)}
                                required
                            />
                        </div>
                        <button onClick={handleSendSubtitleContent}>
                            <FiCheck size={24} /> Adicionar Subtítulo a Postagem
                        </button>
                        <button onClick={removeContent}>
                            <FiX size={24} /> Remover Item
                        </button>
                    </>
                }

            </div>


        </div>
    )
}
