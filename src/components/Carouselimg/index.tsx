/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import Image from 'next/image';
import { IoMdArrowDropleftCircle } from 'react-icons/io';
import { IoMdArrowDroprightCircle } from 'react-icons/io';

import styles from './styles.module.scss';
import { useContent } from "../../hooks/useContentHook";

type CarouselProps = {
    images: HTMLImageElement[],
}

export function Carousel({ images }: CarouselProps) {

    const contentRef = useRef<HTMLUListElement>(null)

    const [actual, setActual] = useState<number>(0);

    const { content } = useContent()

    // const fileInfo = content.map((data) => {
    //     Array.from(data.content).forEach((file) => {
    //         console.log(file, "file")
    //     })
    // })

    function handleNext() {

        if (contentRef.current !== null) {
            contentRef.current.children[actual].className = styles.before;
            contentRef.current.children[actual + 1].className = styles.in;
            setActual(actual + 1);
        }

    }

    function handlePrevious() {

        if (contentRef.current !== null) {
            contentRef.current.children[actual].className = styles.after;
            contentRef.current.children[actual + -1].className = styles.in;
            setActual(actual - 1);
        }

    }

    return (
        <div className={styles.container}>
            {
                actual > 0 && (
                    <IoMdArrowDropleftCircle
                        tabIndex={0}
                        onClick={handlePrevious}
                        color="#FFF"
                        className={styles.left}
                    />
                )
            }
            <ul
                className={styles.imgsDiv}
                ref={contentRef}
            >
                {
                    (content !== null && content !== undefined) &&
                    <>
                        {
                            content.map((data, k) => {
                                return (
                                    <>
                                        {
                                            (data.content !== null && data.content !== undefined) &&

                                            Array.from(data.content).forEach((file, k) => {
                                                console.log(file)
                                                return (
                                                    <div key={k}>
                                                        <img src={URL.createObjectURL(file)} alt={data.content.name} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                    </>
                }

            </ul>
            {
                actual < (images.length - 1) && (
                    <IoMdArrowDroprightCircle
                        tabIndex={0}
                        onClick={handleNext}
                        color="#FFF"
                        className={styles.right}
                    />
                )
            }
        </div>
    )
}
