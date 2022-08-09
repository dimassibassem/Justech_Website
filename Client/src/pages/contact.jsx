import React from 'react'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import ContactSection from '@/components/ContactSection'


function Contact() {
    return (
    <div className='bg-white'>
      <Head>
        <title>Justech - Contact Us</title>
        <meta
          name='description'
          content='Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.'
        />
      </Head>

      <div className='bg-gray-100'>
        <Header />
      </div>

      <main>
        <ContactSection />

      </main>
      <div className='bg-gray-100'><Footer /></div>

    </div>
  )
}

export default Contact




