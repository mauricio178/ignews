/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react'
import styles from './styles.module.scss'
import { FiCheck, FiX } from "react-icons/fi";
import { RiVideoAddLine, RiVideoFill, RiImageAddLine, RiImage2Line } from "react-icons/ri";
import Image from 'next/image'
import { Input } from '../Input';
import { Carousel } from '../Carouselimg';
import { useContent, ContentProps } from '../../hooks/useContentHook';


export function Content(content: ContentProps) {

    const [paragraph, setParagraph] = useState<string>('');
    const [subtitleContent, setSubtitleContent] = useState<string>('');
    const [link, setLink] = useState<string>('');


    const [photo, setPhoto] = useState<HTMLImageElement>();
    const [carousel, setCarousel] = useState<HTMLImageElement>();

    const { removeC, switchContent, switchType } = useContent()

    const list = [
        { id: "-", name: '-' },
        { id: "Paragraph", name: 'Paragrafo' },
        { id: "Video", name: 'Video' },
        { id: "Foto", name: 'Foto' },
        { id: "Link", name: 'Link' },
        { id: "Carousel", name: 'Carousel de Imagens' },
        { id: "Subtitle", name: 'Subtítulo' },
    ];

    function handleSendParagraph() {
        switchContent(content.id, paragraph)
    }

    function handleSendVideo() {
        console.log("video enviado")
    }


    //create new fnct 4 carousel
    function handleSelectMultipleFiles(evt) {
        const thisLength = evt.target.files.length;
        if (thisLength === 0)
            return;
        setCarousel(evt.target.files[0])
    }

    function handleFileSelect(evt) {
        const thisLength = evt.target.files.length;
        if (thisLength === 0)
            return;
        setPhoto(evt.target.files[0])
    }

    function handleSendPhoto() {
        switchContent(content.id, photo)
    }

    function handleSendCarousel() {
        switchContent(content.id, carousel)
        console.log('carousel: ', carousel)
    }

    function handleSendLink() {
        switchContent(content.id, link)
    }

    function handleSendSubtitleContent() {
        switchContent(content.id, subtitleContent)
    }

    return (

        <div className={styles.container}>
            <div>
                <p>Conteúdo N°: {content.id}</p>
                <h3>Selecione o tipo de Conteúdo </h3>
            </div>


            <div className={styles.selectRow}>
                <select onChange={(e: any) => switchType(content.id, e.target.value)}>
                    {
                        list.map((item, k) => (
                            <option key={k} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            <div id={`content${content.id}`} className={styles.content}>
                {
                    content.content.type === "-" &&
                    <div>

                        <div className={styles.none}><p>- selecione uma opção -</p></div>
                    </div>
                }
                {
                    content.content.type === "Paragraph" &&
                    <>
                        <textarea
                            value={paragraph}
                            onChange={(text) => setParagraph(text.target.value)}
                            placeholder="Insira o Parágrafo"
                            required
                        />
                        <button onClick={handleSendParagraph}>
                            <FiCheck size={24} /> Adicionar Parágrafo ao Preview
                        </button>

                    </>
                }
                {
                    content.content.type === "Video" &&
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
                            <FiCheck size={24} /> Adicionar Video ao Preview
                        </button>

                    </>
                }
                {
                    content.content.type === "Foto" &&
                    <>
                        <div className={styles.foto}>
                            <input type="file" accept="image/*" onChange={handleFileSelect} />
                            <div>
                                {
                                    (photo !== null && photo !== undefined) &&
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt={photo.name}
                                    />
                                }
                            </div>
                        </div>
                        <button onClick={handleSendPhoto}>
                            <FiCheck size={24} /> Adicionar Imagem ao Preview
                        </button>

                    </>
                }
                {
                    content.content.type === "Link" &&
                    <>
                        <div className={styles.link}>
                            <Input
                                placeholder="Example: https://www.example.com.br"
                                type="text"
                                value={link}
                                onchange={(e: any) => setLink(e)}
                                required
                            />
                        </div>
                        <button onClick={handleSendLink}>
                            <FiCheck size={24} /> Adicionar Link ao Preview
                        </button>

                    </>
                }
                {
                    content.content.type === "Carousel" &&
                    <>
                        <div className={styles.carousel}>
                            <input type="file" accept="image/*" multiple onChange={handleSelectMultipleFiles} />

                            <div>
                                {/* how get images ?  */}
                                
                                {
                                    (carousel !== null && carousel !== undefined) &&

                                    <img
                                        src={URL.createObjectURL(carousel)}
                                        alt={carousel.name}
                                    />
                                }

                                {/* <Carousel images={[]} postId={0} /> */}
                            </div>
                        </div>
                        <button onClick={handleSendCarousel}>
                            <FiCheck size={24} /> Adicionar Carousel ao Preview
                        </button>

                    </>
                }
                {
                    content.content.type === "Subtitle" &&
                    <>
                        <div className={styles.subtitleContent}>
                            <Input
                                placeholder="Subtítulo"
                                type="text"
                                value={subtitleContent}
                                onchange={(e: any) => setSubtitleContent(e)}
                                required
                            />
                        </div>
                        <button onClick={handleSendSubtitleContent}>
                            <FiCheck size={24} /> Adicionar Subtítulo ao Preview
                        </button>
                    </>
                }

                <button onClick={() => removeC(content.id)}>
                    <FiX size={24} /> Remover Item
                </button>

            </div>
        </div>
    )
}
