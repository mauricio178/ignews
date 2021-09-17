/* eslint-disable @next/next/no-img-element */
import React, { useState, SetStateAction } from 'react'
import { Input } from '../Input';
import styles from './styles.module.scss'


export function Example() {
    const [selectValue, setSelectValue] = useState(1);

    const list = [
        { id: 1, name: '--' },
        { id: 2, name: 'Paragrafo' },
        { id: 3, name: 'Video' },
        { id: 4, name: 'Foto' },
        { id: 5, name: 'Link' },
    ];

    function handleCreate(e) {
        e.preventDefault()

        if (selectValue == 2) {
            let exemploInner = document.getElementById("paragraph")
            exemploInner.innerHTML = "<input>"
        }
        if (selectValue == 3) {
            let exemploInner = document.getElementById("video")
            exemploInner.innerHTML = '<div>video</divlassName=>'
        }
        if (selectValue == 4) {
            let exemploInner = document.getElementById("foto")
            exemploInner.innerHTML = "<div>foto</div>"
        }
        if (selectValue == 5) {
            let exemploInner = document.getElementById("link")
            exemploInner.innerHTML = "<div>LINK</div>"
        }
    }

    return (
        <div className={styles.container}>
            <h3>Tipo de Conteúdo: <strong>{selectValue}</strong></h3>
            <div className={styles.selectRow}>
                <select value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                    {
                        list.map((item, k) => (
                            <option key={k} value={item.id}>{item.name}</option>
                        ))
                    }

                </select>
                <button onClick={handleCreate}>
                    OK
                </button>
            </div>
            <div className={styles.content}>
                <div id="paragraph" className={styles.paragrafo}>
                </div>
                <div id="video" className={styles.video}>
                </div>
                <div id="foto" className={styles.foto}>
                </div>
                <div id="link" className={styles.link}>
                </div>
            </div>
        </div>
    )
}
