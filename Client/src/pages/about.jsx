import React from 'react'
import Head from 'next/head'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import JustechInfo from "@/components/JustechInfo";
import StickyButton from "@/components/vistorChat/StickyButton";

function About() {
    return (
        <div>
            <Head>
                <title>Justech - About Us</title>
                <meta
                    name='description'
                    content=' Justech is a Tunisian company specializing in the field of technological innovation and in particular digital
          content, e-Learning, virtual reference libraries and e-business solutions. Justech is distinguished not only
          by solid partners and high-level services but also by a multilingual, dynamic and qualified team.'
                />
            </Head>

            <div className='bg-gray-100'>
                <Header/>
            </div>
            <main>
                <JustechInfo/>
                <StickyButton/>
            </main>
            <div className='bg-gray-100'><Footer/></div>
        </div>
    )
}

export default About
