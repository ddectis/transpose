import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Spline_Sans_Mono } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Transposer from '@/components/Transposer'
import LoadSong from '@/components/LoadSong'
import PageScroll from '@/components/PageScroll'
import { useState } from 'react'



const inter = Inter({ subsets: ['latin'] })
const mono = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'swap'
})

export default function Home() {

  const [isSongSelected, setIsSongSelected] = useState(false)
  const [stepsTransposed, setStepsTransposed] = useState(0)

  return (
    <>
      <Head>
        <title>CMH Songbook Transpose Tool</title>
        <meta name="description" content="By Dan Dectis" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${mono.className}`}>

        <div>
          <Image
            src='/logo.jpg'
            width={721}
            height={250}
            alt='CMH Logo'
          />

        </div>

        <h1>CMH SONGBOOK TRANSPOSITION TOOL</h1>

        {isSongSelected ? (
          <Transposer
            isSongSelected={isSongSelected}
            stepsTransposed={stepsTransposed}
            setStepsTransposed={setStepsTransposed}
          />
        ) : null}


        <LoadSong
          isSongSelected={isSongSelected}
          setIsSongSelected={setIsSongSelected}
          stepsTransposed={stepsTransposed}
          setStepsTransposed={setStepsTransposed}
        />

        {isSongSelected ? (
          <PageScroll />
        ) : null}
      </main>
    </>
  )
}

