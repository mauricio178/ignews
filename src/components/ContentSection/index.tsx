import React, { useState, useRef, Dispatch, SetStateAction } from 'react'
import styles from './styles.module.scss'
import { FiCheck, FiFilm, FiImage, FiX } from "react-icons/fi";
import { BiCarousel } from "react-icons/bi";
import { Input } from '../Input';
import { Carousel } from '../Carouselimg';
import { useContent, ContentProps } from '../../hooks/useContentHook';

type ContentSectionProps = {
    setContentSection: Dispatch<SetStateAction<ContentProps[]>>,
    thisContent: ContentProps
}

export function ContentSection({thisContent, setContentSection}: ContentSectionProps) {

    const [paragraph, setParagraph] = useState<string>('');
    const [link, setLink] = useState<string>('');

    const [photo, setPhoto] = useState<File>();
    const [imageTitle, setImageTitle] = useState<string>('');

    const [carousel, setCarousel] = useState<File[]>();
    const [carouselTitle, setCarouselTitle] = useState<string>('');

    const [video, setVideo] = useState<File>();
    const [videoTitle, setVideoTitle] = useState<string>('');

    const list = [
        { id: "-", name: '-' },
        { id: "Paragraph", name: 'Paragrafo' },
        { id: "Video", name: 'Video' },
        { id: "Foto", name: 'Foto' },
        { id: "Link", name: 'Link' },
        { id: "Carousel", name: 'Carousel de Imagens' },
    ];

    function handleVideoSelect(evt) {
        setVideo(evt.target.files[0])
    }

    function handleFileSelect(evt) {
        setVideo(evt.target.files[0])
    }

    function handleSelectMultipleFiles(evt) {
        const thisLength = evt.target.files.length;
        if (thisLength === 0)
            return;

        var array = []

        for (let i = 0; i < thisLength; i++) {
            array.push(evt.target.files[i])
        }

        setCarousel(array)

    }

    function switchTypeSection(id: number, type: string) {
        setContentSection(oldValue => {
            var filtered = oldValue.filter((data) => {
                if (data.id === id) {
                    data.type = type
                }
                return data
            });
            return filtered;
        })
    }

    function handleSaveSection(){
        const formData = {
            carousel,
            paragraph,
            photo,

        }

        console.log(formData)
    }

    return (

        <div className={styles.container}>
            <div>
                <p>Nova Sessão - Conteúdo N°: {thisContent.id}</p>
                <h3>Selecione o tipo de Conteúdo </h3>
            </div>


            <div className={styles.selectRow}>
                <select onChange={(e: any) => switchTypeSection(thisContent.id, e.target.value)}>
                    {
                        list.map((item, k) => (
                            <option key={k} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <div id={`content${thisContent.id}`} className={styles.content}>
                {
                    thisContent.type === "-" &&
                    <div>
                        <div className={styles.none}><p>- selecione uma opção -</p></div>
                    </div>
                }
                {
                    thisContent.type === "Paragraph" &&
                    <>
                        <textarea
                            value={paragraph}
                            onChange={(text) => setParagraph(text.target.value)}
                            placeholder="Insira o Parágrafo"
                            required
                        />
                    </>
                }
                {
                    thisContent.type === "Video" &&
                    <>
                        <div className={styles.video}>
                            <input type="file" accept="video/*" onChange={handleVideoSelect} />
                            <div>
                                {
                                    (video !== null && video !== undefined) ?
                                        <>
                                            <Input
                                                placeholder="Título do Vídeo"
                                                type="text"
                                                value={videoTitle}
                                                onchange={(e: string) => setVideoTitle(e)}
                                                required
                                            />
                                        </>
                                        :
                                        <div>
                                            <FiFilm size={45} />
                                        </div>
                                }
                            </div>
                        </div>
                    </>
                }
                {
                    thisContent.type === "Foto" &&
                    <>
                        <div className={styles.foto}>
                            <input type="file" accept="image/*" onChange={handleFileSelect} />
                            <div>
                                {
                                    (photo !== null && photo !== undefined) ?
                                        <>
                                            <Input
                                                placeholder="Título da Imagem"
                                                type="text"
                                                value={imageTitle}
                                                onchange={(e: string) => setImageTitle(e)}
                                                required
                                            />
                                        </>
                                        :
                                        <div>
                                            <FiImage size={45} />
                                        </div>
                                }


                            </div>
                        </div>
                    </>
                }
                {
                    thisContent.type === "Link" &&
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
                    </>
                }
                {
                    thisContent.type === "Carousel" &&
                    <>
                        <div className={styles.carousel}>
                            <input type="file" accept="image/*" multiple onChange={handleSelectMultipleFiles} />
                            <div>
                                {
                                    (carousel !== null && carousel !== undefined) ?
                                        <>
                                            <Carousel images={carousel} />
                                            <Input
                                                placeholder="Título do Carousel"
                                                type="text"
                                                value={carouselTitle}
                                                onchange={(e: string) => setCarouselTitle(e)}
                                                required
                                            />
                                        </>
                                        :
                                        <div>
                                            <BiCarousel size={45} />
                                        </div>

                                }
                            </div>
                        </div>
                    </>
                }
                <button onClick={() => handleSaveSection()}>
                    <FiCheck size={24} /> Salvar Item
                </button>
            </div>
        </div>
    )
}
