import React, { useId } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Tab } from '@headlessui/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper'
import Feature from '@/components/Feature'


export function SwiperGallery({ partners, selectedIndex }) {
  const id = useId()
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={5}
      modules={[Autoplay]}
      autoplay
    >

      {partners?.map((partner, partnerIndex) => (
        <SwiperSlide key={`${partnerIndex + id}`}>
          <Feature
            key={partner.companyName}
            partner={{
              ...partner,
              companyName: (
                <Tab className='[&:not(:focus-visible)]:focus:outline-none'>
                  <span className='absolute inset-0' />
                  {partner.companyName}
                </Tab>
              )
            }}
            isActive={partnerIndex === selectedIndex}
            className='relative'
            onClick={() => {console.log(partner.companyName)}}
          />
        </SwiperSlide>
      ))}

    </Swiper>
  )
}
