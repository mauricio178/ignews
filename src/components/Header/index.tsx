/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { ActiveLink } from '../ActiveLink/indes'
import { ButtonSignIn } from '../ButtonSignIn'
import styles from './styles.module.scss'
import { FiPlus, FiCoffee, FiHome } from "react-icons/fi";

export function Header() {


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/ig.new.png" alt="ig.news" width="170" height="70" />
                <nav>
                    <ActiveLink activeClassName= {styles.active} href="/" >
                        <a><FiHome/>Home</a>
                    </ActiveLink>

                    <ActiveLink  activeClassName= {styles.active} href="/posts" >
                        <a><FiCoffee size={22}/>Posts</a>
                    </ActiveLink>

                    <ActiveLink  activeClassName= {styles.active} href="/create-post" >
                        <a><FiPlus size={22}/> Novo Post</a>
                    </ActiveLink>
                </nav>

                <ButtonSignIn />
            </div>
        </header>
    );
}
