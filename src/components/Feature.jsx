import React from 'react'
import clsx from 'clsx'
import Image from 'next/future/image'


function Feature({ feature, isActive, className, ...props }) {
  return (
    <div
      className={clsx(className, !isActive && 'opacity-75 hover:opacity-100') + ' grid grid-cols-1 gap-4 p-4 '}
      {...props}
    >
      <div>
        <Image src={feature.image} alt='' />
      </div>
      <p className='mt-2 font-display text-md text-slate-800'>
        {feature.summary}
      </p>
    </div>
  )


}

export default Feature
