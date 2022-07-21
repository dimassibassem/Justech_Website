import React, { useId } from 'react'
import Head from 'next/head'
import { Header } from '@/components/Header'
import Image from 'next/future/image'
import { Footer } from '@/components/Footer'
import { partners } from '@/utils'

const Partners = () => {


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
        <Header />
      </div>

      <main>
        <div className='grid grid-cols-2 py-20 gap-20 px-10'>
          {partners.map(({ name, summary, description, image }) => (
            <div key={name} className='grid grid-cols-2'>
              <div key={name} className='flex flex-col items-center justify-center'>
                <Image src={image} alt={name} />
                <h2 className='text-center font-semibold bold pt-3'>{summary}</h2>
              </div>
              <div>
                <h2 className=' pl-2 pt-3 text-sm'>{description}</h2>
              </div>
            </div>
          ))}
        </div>

      </main>
      <div className='bg-gray-100'><Footer /></div>

    </div>
  )
}

export default Partners
