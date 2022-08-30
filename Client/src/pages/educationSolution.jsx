import React from 'react';
import Head from "next/head";
import EducationSolution from "@/components/e-education solutions/EducationSolution";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import StickyButton from "@/components/vistorChat/StickyButton";

function educationSolution() {
    return (

        <div className='bg-gray-100'>
            <Head>
                <title>Justech - E-Education solutions</title>
                <meta
                    name='description'
                    content='Justech is a Tunisian company specializing in the field of technological innovation and in particular digital content, e-Learning, virtual reference libraries and e-business solutions. Justech is distinguished not only by solid partners and high-level services but also by a multilingual, dynamic and qualified team.'
                />
            </Head>
            <StickyButton/>
            <div className='bg-gray-100'><Header /></div>
            <main>
                <EducationSolution/>
            </main>
            <Footer/>
        </div>

    );
}

export default educationSolution;
