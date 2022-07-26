import { Tab } from '@headlessui/react'
import { Container } from '@/components/Container'
import { SwiperGallery } from '@/components/SwiperGallery'
import Feature from '@/components/Feature'
import { partners } from '@/utils'


function PartnersMobile() {
  return (
    <div className='-mx-4 mt-20 grid grid-cols-2 items-center gap-x-6 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden'>
      {partners.map((feature) => (
        <div key={feature.name}>
          <Feature feature={feature} className='mx-auto max-w-xl' isActive />
          <div className='relative mt-10 pb-10'>
            <div className='absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6' />
          </div>
        </div>
      ))}
    </div>
  )
}

function PartnersDesktop() {
  return (<Tab.Group as='div' className='hidden lg:mt-20 lg:block'>
      {({ selectedIndex }) => (
        <SwiperGallery partners={partners} selectedIndex={selectedIndex} />
      )}
    </Tab.Group>
  )
}

export function Partners() {
  return (
    <section
      id='secondary-features'
      aria-label='Features for simplifying everyday business tasks'
      className='pt-20 pb-14 sm:pb-20 sm:pt-32 lg:pb-32'
    >
      <Container className='py-24'>
        <div className='mx-auto max-w-2xl md:text-center'>
          <h2 className='font-display text-3xl tracking-tight text-slate-900 sm:text-4xl'>
            Simplify everyday business tasks.
          </h2>
          <p className='mt-4 pb-4  text-lg tracking-tight text-slate-700'>
            Because you’d probably be a little confused if we suggested you
            complicate your everyday business tasks instead.
          </p>
        </div>
        <PartnersMobile />
        <PartnersDesktop />
      </Container>
    </section>
  )
}
