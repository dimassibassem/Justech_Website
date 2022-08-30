import React, {useEffect} from 'react'
import Head from 'next/head'
import axios from "axios";
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {useStore} from "@/store";
import Blog from "@/components/partners/Blog";
import StickyButton from "@/components/vistorChat/StickyButton";


function Index() {
    const setPartners = useStore(state => state.setPartners)
    const partners = useStore(state => state.partners)
    const fetchPartners = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Partners/all`)
        setPartners(res.data)
    }
    useEffect(() => {
        fetchPartners().catch(err => console.log(err))
    }, [])
    return (
        <div className='bg-white'>
            <Head>
                <title>Justech - Partners</title>
                <meta
                    name='description'
                    content='Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.'
                />
            </Head>
            <StickyButton/>
            <div className='bg-gray-100'>
                <Header/>
            </div>

            <main>
                <Blog partners={partners}/>
            </main>
            <div className='bg-gray-100'><Footer/></div>

        </div>
    )
}

export default Index
