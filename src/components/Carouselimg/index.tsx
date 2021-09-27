/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import Image from 'next/image';
import { IoMdArrowDropleftCircle } from 'react-icons/io';
import { IoMdArrowDroprightCircle } from 'react-icons/io';

import styles from './styles.module.scss';

type CarouselProps = {
    images: Image[],
    postId: number
}

type Image = string[]

export function Carousel({ images, postId }: CarouselProps) {


    const contentRef = useRef<HTMLUListElement>(null)

    const [actual, setActual] = useState<number>(0);

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

            {/* <img
                src={URL.createObjectURL(photo)}
                alt={photo.name}
            /> */}

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

                {/* {
                    images.map((postsData, k) => {
                        return (
                            <li
                                className={k === 0 ? styles.in : styles.after}
                                key={k}
                            >
                                <p>img here</p>
                                <Image
                                    src={`${storage}blog/${postId}/${postsData[0]}`}
                                    alt={postsData[1]}
                                    layout="fill"
                                />
                            </li>
                        )
                    })
                } */}
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
