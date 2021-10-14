import styles from './styles.module.scss'
import React from 'react'
import logo from '../../../public/images/logo.png'
import {ActiveLink} from '../ActiveLink/indes'
import { FiMenu, FiHome, FiCoffee, FiPlus } from "react-icons/fi";
import Image from 'next/image'
import { ButtonSignIn } from '../ButtonSignIn';


export function Header() {

    return (
        <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Image src="/images/logo.png" alt="ig.news" width="170" height="70" />
            <nav>
                <ActiveLink activeClassName= {styles.active} href="/" >
                    <a><FiHome/>Home</a>
                </ActiveLink>

                <ActiveLink  activeClassName= {styles.active} href="/posts" >
                    <a><FiCoffee size={22}/>Posts</a>
                </ActiveLink>

                <ActiveLink  activeClassName= {styles.active} href="/create-post" >
                    <a><FiPlus size={22}/> Create</a>
                </ActiveLink>
            </nav>

            <ButtonSignIn />
        </div>
    </header>
    );
}
