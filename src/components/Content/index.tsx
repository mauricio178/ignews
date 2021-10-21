/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react'
import styles from './styles.module.scss'
import { FiCheck, FiFilm, FiImage, FiPlus, FiX } from "react-icons/fi";
import { BiCarousel } from "react-icons/bi";
import Image from 'next/image'
import { Input } from '../Input';
import { Carousel } from '../Carouselimg';
import { useContent, ContentProps } from '../../hooks/useContentHook';
import api from '../../services/api';
import { usePost } from '../../hooks/postHook';
import { ContentSection } from '../ContentSection';

type AllContent = ContentProps[]


export function Content(thisContent: ContentProps) {

    const [paragraph, setParagraph] = useState<string>('');
    const [subtitleContent, setSubtitleContent] = useState<string>('');
    const [link, setLink] = useState<string>('');

    const [photo, setPhoto] = useState<File>();
    const [imageTitle, setImageTitle] = useState<string>('');

    const [carousel, setCarousel] = useState<File[]>();
    const [carouselTitle, setCarouselTitle] = useState<string>('');

    const [video, setVideo] = useState<File>();
    const [videoTitle, setVideoTitle] = useState<string>('');

    const [contentSection, setContentSection] = useState<AllContent>([] as AllContent)

    const { removeContent, switchContent, switchType } = useContent()

    const list = [
        { id: "-", name: '-' },
        { id: "Paragraph", name: 'Paragrafo' },
        { id: "Video", name: 'Video' },
        { id: "Foto", name: 'Foto' },
        { id: "Link", name: 'Link' },
        { id: "Carousel", name: 'Carousel de Imagens' },
        { id: "Subtitle", name: 'Subtítulo' },
    ];

    function switchContentSection(id: number, content: any) {
        setContentSection(oldValue => {
            var filtered = oldValue.filter((data) => {
                if (data.id === id) {
                    data.content = content
                }
                return data
            });
            return filtered;
        })
    }

    function addContentSection() {
        if (contentSection.length === 0) {
            setContentSection([{ id: 1 }])
            return;
        }
        setContentSection(OldValue => {
            let newId;
            let i = 0;

            OldValue.map((data) => {
                i++;
                if (i === OldValue.length) {
                    newId = data.id + 1;
                }
            })
            console.log(contentSection)
            return contentSection.concat([{ id: newId }])
        })
    }

    function handleSendParagraph() {
        switchContent(thisContent.id, paragraph)
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

    function handleFileSelect(evt) {
        // const thisLength = evt.target.files.length;
        // if (thisLength === 0)
        //     return;

        // var array = []

        // for (let i = 0; i < thisLength; i++) {
        //     array.push(evt.target.files[i])
        // }

        setPhoto(evt.target.files)
    }

    function handleVideoSelect(evt) {
        setVideo(evt.target.files[0])
        console.log(evt.target.files[0])
    }

    function handleRemoveContentSection(id: number) {
        setContentSection(oldValue => {
            var filtered = oldValue.filter((data) => {
                return data.id !== id
            });
            return filtered;
        })
    }

    function handleSendVideo() {
        switchContent(thisContent.id, video)

        var form = new FormData();

        form.append("video1", video);
        form.append("title_video1", videoTitle);

        api.post('blog/post', form, { headers: { "Enctype": "multipart/form-data" } })
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    function handleSendPhoto() {
        switchContent(thisContent.id, photo)

        const template = [{
            section: [
                { subtitle: 'subtitleteste' },
                { image: 'image1' },

            ]
        }]

        var formData = new FormData();

        formData.append('template', JSON.stringify(template));
        formData.append('image1', photo);
        formData.append('title_image1', imageTitle);

        const testeData = {
            image1: photo,
            title_image1: imageTitle,
            template: template
        }

        api.post('blog/post', formData, { headers: { "Enctype": "multipart/form-data" } })
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    function handleSendCarousel() {

        const form = new FormData();

        carousel.map((data) => {
            return form.append("carousel1[]", data);
        })

        form.append('title_carousel1[]', carouselTitle)

        console.log(form)

        api.post('blog/post', form, { headers: { "Enctype": "multipart/form-data" } })
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
        // switchContent(content.id, carousel)
    }

    function handleSendLink() {
        switchContent(thisContent.id, link)
    }

    function handleSendSubtitleContent() {
        switchContent(thisContent.id, subtitleContent)
    }

    return (

        <div className={styles.container}>
            <div>
                <p>Conteúdo N°: {thisContent.id}</p>
                <h3>Selecione o tipo de Conteúdo </h3>
            </div>


            <div className={styles.selectRow}>
                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => switchType(thisContent.id, e.target.value)}>
                    {
                        list.map((item, k) => (
                            <option key={k} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <div id={`content${thisContent.id}`} className={styles.content}>
                {
                    thisContent.content.type === "-" &&
                    <div>
                        <div className={styles.none}><p>- selecione uma opção -</p></div>
                    </div>
                }
                {
                    thisContent.content.type === "Paragraph" &&
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
                    thisContent.content.type === "Video" &&
                    <>
                        <div className={styles.video}>
                            <input type="file" accept="video/*" onChange={handleVideoSelect} />
                            <div>
                                {
                                    (video !== null && video !== undefined) ?
                                        <>


                                            {/* <video width="320" height="240" controls>
                                                <source src={URL.createObjectURL(video)} />
                                            </video> */}


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
                        <button onClick={handleSendVideo}>
                            <FiCheck size={24} /> Adicionar Video ao Preview
                        </button>

                    </>
                }
                {
                    thisContent.content.type === "Foto" &&
                    <>
                        <div className={styles.foto}>
                            <input type="file" accept="image/*" onChange={handleFileSelect} />
                            <div>
                                {
                                    (photo !== null && photo !== undefined) ?
                                        <>
                                            {/* {
                                                photo.map((data, k) => {
                                                    return (
                                                        <div key={k}> */}
                                            {/* <img
                                                                src={URL.createObjectURL(photo)}
                                                                alt={photo.name}
                                                            /> */}
                                            {/* </div>
                                                    )
                                                })
                                            } */}
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
                        <button onClick={handleSendPhoto}>
                            <FiCheck size={24} /> Adicionar Imagem ao Preview
                        </button>
                    </>
                }
                {
                    thisContent.content.type === "Link" &&
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
                    thisContent.content.type === "Carousel" &&
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

                        <button onClick={handleSendCarousel}>
                            <FiCheck size={24} /> Adicionar Carousel ao Preview
                        </button>
                    </>
                }
                {
                    thisContent.content.type === "Subtitle" &&
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

                        <div>
                            {
                                contentSection.map((data, k) => {
                                    return (
                                        <div key={k}>
                                            <ContentSection 
                                            thisContent={data} 
                                            setContentSection={setContentSection} />
                                            <button onClick={() => handleRemoveContentSection(data.id)}>
                                                <FiX size={24} /> Remover Item
                                            </button>
                                        </div>
                                    )

                                })
                            }
                        </div>

                        <button onClick={addContentSection}>
                            <FiPlus size={24} /> Conteudo à Sessão
                        </button>
                        <button onClick={handleSendSubtitleContent}>
                            <FiCheck size={24} /> Adicionar Subtítulo ao Preview
                        </button>
                    </>
                }

                <button onClick={() => removeContent(thisContent.id)}>
                    <FiX size={24} /> Remover Item
                </button>

            </div>
        </div>
    )
}
