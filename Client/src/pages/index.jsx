import Head from 'next/head'
import {useEffect} from "react";
import axios from "axios";
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {Hero} from '@/components/Hero'
import {PrimaryFeatures} from '@/components/PrimaryFeatures'
import {Partners} from '@/components/Partners'
import {Testimonials} from '@/components/Testimonials'
import {ContactUs} from '@/components/ContactUs'
import {useStore} from "@/store";
import Events from "@/components/Events";

export default function Home() {

    const setPartners = useStore(state => state.setPartners)
    const fetchPartners = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Partners/all`)
        setPartners(res.data)
    }
    useEffect(() => {
        fetchPartners().catch(err => console.log(err))
    }, [])
    return (
        <div className='bg-gray-200'>

            <Head>
                <title>Justech</title>
                <meta
                    name='description'
                    content='Justech is a Tunisian company specializing in the field of technological innovation and in particular digital content, e-Learning, virtual reference libraries and e-business solutions. Justech is distinguished not only by solid partners and high-level services but also by a multilingual, dynamic and qualified team.'
                />
            </Head>
            <Header/>
            <main>
                <Hero/>
                <PrimaryFeatures/>
                <Partners/>
                <Testimonials/>
                <Events/>
            </main>
            <ContactUs/>
            <Footer/>
        </div>
    )
}
