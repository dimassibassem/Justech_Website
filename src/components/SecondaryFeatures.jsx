import { useId } from 'react'
import { Tab } from '@headlessui/react'
import { Container } from '@/components/Container'
import wiley from '@/images/logos/partners/wiley.png'
import cairn from '@/images/logos/partners/cairn.png'
import sage from '@/images/logos/partners/sage.png'
import emeraldinsight from '@/images/logos/partners/emeraldinsight.png'
import natgeo from '@/images/logos/partners/natgeo.jpg'
import taylor from '@/images/logos/partners/taylor.png'
import sae from '@/images/logos/partners/sae.png'
import eltech from '@/images/logos/partners/eltech.png'
import ebsco from '@/images/logos/partners/ebsco.png'
import cenage from '@/images/logos/partners/cenage.png'
import bmj from '@/images/logos/partners/bmj.jpg'
import almanhal from '@/images/logos/partners/almanhal.png'
import { SwiperGallery } from '@/components/SwiperGallery'
import Feature from '@/components/Feature'


import { partners } from '@/utils'


function FeaturesMobile() {
  return (
    <div className='-mx-4 mt-20 grid grid-cols-2 items-center gap-x-6 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden'>
      {/*{({ selectedIndex }) => (*/}
      {/*  <>*/}
      {/*    <SwiperGallery features={features} selectedIndex={selectedIndex} />*/}
      {/*  </>*/}
      {/*)}*/}
      {partners.map((feature) => (
        <div key={feature.name}>
          <Feature feature={feature} className='mx-auto max-w-xl' isActive />
          <div className='relative mt-10 pb-10'>
            <div className='absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6' />
            {/*<div*/}
            {/*  className='relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10'>*/}
            {/*  <Image*/}
            {/*    className='w-full'*/}
            {/*    src={feature.image}*/}
            {/*    alt=''*/}
            {/*    sizes='52.75rem'*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
        </div>
      ))}
    </div>
  )
}

function FeaturesDesktop() {
  return (<>
      <Tab.Group as='div' className='hidden lg:mt-20 lg:block'>
        {({ selectedIndex }) => (
          <>
            <SwiperGallery partners={partners} selectedIndex={selectedIndex} />
            {/*<Tab.Panels className='relative mt-20 overflow-hidden rounded-4xl bg-slate-200 px-14 py-16 xl:px-16'>*/}
            {/*  <div className='-mx-5 flex'>*/}
            {/*    {features.map((feature, featureIndex) => (*/}
            {/*      <Tab.Panel*/}
            {/*        static*/}
            {/*        key={feature.name}*/}
            {/*        className={clsx(*/}
            {/*          'px-5 transition duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none',*/}
            {/*          featureIndex !== selectedIndex && 'opacity-60'*/}
            {/*        )}*/}
            {/*        style={{ transform: `translateX(-${selectedIndex * 100}%)` }}*/}
            {/*        aria-hidden={featureIndex !== selectedIndex}*/}
            {/*      >*/}
            {/*        <div*/}
            {/*          className='w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10'>*/}
            {/*          <Image*/}
            {/*            className='w-full'*/}
            {/*            src={feature.image}*/}
            {/*            alt=''*/}
            {/*            sizes='52.75rem'*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*        <p className='mt-4 text-sm text-slate-600'>{feature.description}</p>*/}
            {/*      </Tab.Panel>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*  <div className='pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10' />*/}
            {/*</Tab.Panels>*/}
          </>
        )}
      </Tab.Group>
    </>
  )
}

export function SecondaryFeatures() {
  return (
    <section
      id='secondary-features'
      aria-label='Features for simplifying everyday business tasks'
      className='pt-20 pb-14 sm:pb-20 sm:pt-32 lg:pb-32'
    >
      <Container className="py-24">
        <div className='mx-auto max-w-2xl md:text-center'>
          <h2 className='font-display text-3xl tracking-tight text-slate-900 sm:text-4xl'>
            Simplify everyday business tasks.
          </h2>
          <p className='mt-4 pb-4  text-lg tracking-tight text-slate-700'>
            Because you’d probably be a little confused if we suggested you
            complicate your everyday business tasks instead.
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
