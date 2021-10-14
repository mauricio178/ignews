import styles from './styles.module.scss'
import React from 'react'
import { FiMenu } from "react-icons/fi";
import logo from '../../../public/logo.png'
import Image from 'next/image'


export function Header() {

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <FiMenu size={38}/>
                <Image src={logo} alt="logo" width={70} height={40}/>
            </div>
            <div className={styles.navigation}>
                <nav>
                    <ul>
                        <li>About Me</li>
                        <li>Portfólio</li>
                        <li>Contact</li>
                    </ul>
                </nav>

            </div>
        </div>
    );
}
