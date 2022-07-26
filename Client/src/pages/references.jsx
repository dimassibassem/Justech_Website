import React from 'react'
import Head from 'next/head'
import Image from 'next/future/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import bnt from '@/images/references/BNT.jpg'
import eniso from '@/images/references/eniso.jpg'
import FAC from '@/images/references/FAC.jpg'
import FMM from '@/images/references/FMM.jpg'
import FMT from '@/images/references/FMT.jpg'
import FSEGM from '@/images/references/FSEGM.jpg'
import ministryOfEducation from '@/images/references/ministryOfEducation.jpg'
import MinistryOfReaserches from '@/images/references/MinistryOfReaserches.jpg'
import theAfricanDevelopmentBank from '@/images/references/The African Development Bank.jpg'

const references = [
  {
    name: 'The African Development Bank',
    image: theAfricanDevelopmentBank
  },
  {
    name: 'Tunisia’s National Library',
    image: bnt
  },
  {
    name: 'The Tunis Faculty of Medicine',
    image: FMT
  },
  {
    name: 'Faculty of Medicine of Monastir',
    image: FMM
  },
  {
    name: 'National School of Engineers of Sousse'
    , image: eniso
  },
  {
    name: 'Faculty of Economics and Management of Mahdia'
    , image: FSEGM
  },
  {
    name: 'Faculty of Arts and Humanities of Sousse',
    image: FAC
  },
  {
    name: 'The Ministry of Education',
    image: ministryOfEducation
  },
  {
    name: 'Ministry of Higher Education and Scientific Research',
    image: MinistryOfReaserches
  }
]


function References() {
  return (
    <div className='bg-white'>
      <Head>
        <title>Justech - References</title>
        <meta
          name='description'
          content='Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.'
        />
      </Head>

      <div className='bg-gray-100'><Header /></div>

      <main>
        <div className='grid grid-cols-3 py-20 gap-20 px-10'>
          {references.map(({ name, image }) => (
            <div key={name} className='flex flex-col items-center justify-center'>
              <Image priority src={image} alt={name} />
              <h2 className='text-center pt-3 font-semibold'>{name}</h2>
            </div>
          ))}
        </div>

      </main>
      <div className='bg-gray-100'><Footer /></div>

    </div>
  )
}

export default References
