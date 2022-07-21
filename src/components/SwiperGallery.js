import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Tab } from '@headlessui/react'
import 'swiper/css'
import Feature from '@/components/Feature'

export function SwiperGallery({features,selectedIndex}) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >

      {features?.map((feature, featureIndex) => (
        <SwiperSlide key={featureIndex}>
        <Feature
          key={feature.name}
          feature={{
            ...feature,
            name: (
              <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                <span className="absolute inset-0" />
                {feature.name}
              </Tab>
            ),
          }}
          isActive={featureIndex === selectedIndex}
          className="relative"
        />
         </SwiperSlide>
      ))}

    </Swiper>
  )
}
