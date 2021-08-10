/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { ButtonSignIn } from '../ButtonSignIn'
import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/ig.new.png" alt="ig.news" width="170" height="70"/>
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Posts</a>
                </nav>

                <ButtonSignIn/>
            </div>
        </header>
    );
}
