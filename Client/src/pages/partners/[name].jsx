import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import Head from "next/head";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import SinglePartner from "@/components/dashboard/Partners/SinglePartner";


const partner = () => {
    const router = useRouter();
    const {name} = router.query
    const [desiredPartner, setDesiredPartner] = useState();

    const fetchPartner = async () => {
        const response = await axios.get(`https://localhost:7002/api/Partners/GetAllPartnersBy?field=companyName&value=${name}`);
        setDesiredPartner(response.data);
    }
    useEffect(() => {
        fetchPartner().catch(err => console.log(err));
    }, [name]);

    if (desiredPartner?.length > 0)
        return (
            <div className='bg-white'>
                <Head>
                    <title>Justech - Partners</title>
                    <meta
                        name='description'
                        content='Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.'
                    />
                </Head>

                <div className='bg-gray-100'>
                    <Header/>
                </div>

                <main>
                    <SinglePartner partner={desiredPartner}/>
                </main>
                <div className='bg-gray-100'><Footer/></div>

            </div>
        );
    return <div>Loading...</div>


};

export default partner;
