import React from 'react';
import Head from "next/head";
import {Header} from "@/components/Header";
import BusinessSolutions from "@/components/e-business solutions/BusinessSolutions";
import {Footer} from "@/components/Footer";

function businessSolution() {
    return (
        <div className='bg-gray-200'>
            <Head>
                <title>Justech E-Business solutions</title>
                <meta
                    name='description'
                    content='Justech is a Tunisian company specializing in the field of technological innovation and in particular digital content, e-Learning, virtual reference libraries and e-business solutions. Justech is distinguished not only by solid partners and high-level services but also by a multilingual, dynamic and qualified team.'
                />
            </Head>
            <div className='bg-gray-100'><Header/></div>
            <main>
                <BusinessSolutions/>
            </main>
            <Footer/>
        </div>
    );
}

export default businessSolution;
