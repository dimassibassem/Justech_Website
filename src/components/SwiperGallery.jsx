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

      {partners?.map((feature, featureIndex) => (
        <SwiperSlide key={id}>
          <Feature
            key={feature.name}
            feature={{
              ...feature,
              name: (
                <Tab className='[&:not(:focus-visible)]:focus:outline-none'>
                  <span className='absolute inset-0' />
                  {feature.name}
                </Tab>
              )
            }}
            isActive={featureIndex === selectedIndex}
            className='relative'
          />
        </SwiperSlide>
      ))}

    </Swiper>
  )
}
