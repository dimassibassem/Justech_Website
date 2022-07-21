import React from 'react'
import { Tab } from '@headlessui/react'
import Feature from '@/components/Feature'

const SwiperElements = () => {
  return (
    <Tab.List className="grid grid-cols-4 gap-12">
      {features.map((feature, featureIndex) => (
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
      ))}
    </Tab.List>
  )
}

export default SwiperElements
