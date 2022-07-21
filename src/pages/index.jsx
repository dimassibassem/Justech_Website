import Head from 'next/head'


import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'

import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { ContactUs } from '@/components/ContactUs'

export default function Home() {
  return (
    <div className="bg-gray-200">
      <Head>
        <title>Justech</title>
        <meta
          name="description"
          content="Justech is a Tunisian company specializing in the field of technological innovation and in particular digital content, e-Learning, virtual reference libraries and e-business solutions. Justech is distinguished not only by solid partners and high-level services but also by a multilingual, dynamic and qualified team."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        {/*<CallToAction />*/}
        <Testimonials />
        {/*<Pricing />*/}
        <Faqs />
      </main>
      <ContactUs />
      <Footer />
    </div>
  )
}
