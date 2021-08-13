/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { ActiveLink } from '../ActiveLink/indes'
import { ButtonSignIn } from '../ButtonSignIn'
import styles from './styles.module.scss'

export function Header() {


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/ig.new.png" alt="ig.news" width="170" height="70" />
                <nav>
                    <ActiveLink activeClassName= {styles.active} href="/" >
                        <a>Home</a>
                    </ActiveLink>

                    <ActiveLink  activeClassName= {styles.active} href="/posts" >
                        <a>Posts</a>
                    </ActiveLink>
                </nav>

                <ButtonSignIn />
            </div>
        </header>
    );
}
