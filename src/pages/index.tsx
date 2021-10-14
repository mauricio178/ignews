/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from './home.module.scss'
import background from '../../public/background1.png'

export default function Home() {

  return (
    <div className={styles.container} style={{
      background: `url(${background}) center center rgba(0,0,0,0.9)`,
      backgroundSize: 'cover'

    }}>
      <div className={styles.welcome}>
        <h1><strong>hy!</strong> <br/>my name is <span>mauricio rodrigues</span></h1>
        <h2>and i am a <span>frontend developer.</span></h2>
      </div>
      <div className={styles.aboutme}>
        <section>
          <h1>About Me</h1>
        </section>
      </div>
    </div>
  )
}