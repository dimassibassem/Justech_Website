import React, {useEffect} from 'react'
import Head from 'next/head'
import axios from "axios";
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {useStore} from "@/store";
import StickyButton from "@/components/vistorChat/StickyButton";

function References() {
    const references = useStore(store => store.references);
    const setReferences = useStore(store => store.setReferences);

    const fetchData = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/References/all`);
        setReferences(res.data);
    }

    useEffect(() => {
        fetchData().catch(err => console.log(err));
    }, []);
    console.log(references);
    return (
        <div className='bg-white'>
            <Head>
                <title>Justech - References</title>
                <meta
                    name='description'
                    content='Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.'
                />
            </Head>

            <div className='bg-gray-100'><Header/></div>
            <StickyButton/>
            <main>
                <ul role="list"
                    className="px-8 lg:px-[5rem] lg:px-[8rem] py-20 grid grid-cols-2 gap-x-[3rem] gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-[10rem] md:gap-y-[4rem]  xl:gap-x-[13rem] xl:gap-y-[6rem]">
                    {references.map((ref) => (
                        <li key={ref.id} className="grid grid-cols-1 justify-items-center  relative">
                            <div
                                className="block w-full aspect-w-4 aspect-h-3 bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                                <img className=" group-hover:opacity-75"
                                     src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/wwwroot/Uploads/References/${ref.thumbnailName}`}
                                     alt={ref.referenceName}/>
                            </div>
                            <p className="mt-2 text-sm font-medium text-gray-900">{ref.referenceName}</p>
                        </li>
                    ))}
                </ul>
            </main>
            <div className='bg-gray-100'><Footer/></div>

        </div>
    )
}

export default References
