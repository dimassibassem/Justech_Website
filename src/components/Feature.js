import React from 'react'
import clsx from 'clsx'


function Feature({ feature, isActive, className, ...props }) {
  return (
    <div
      className={clsx(className, !isActive && 'opacity-75 hover:opacity-100')}
      {...props}
    >
      <div
        className={clsx(
          'w-9 rounded-lg',
          isActive ? 'bg-blue-600' : 'bg-slate-500'
        )}
      >
        <svg aria-hidden='true' className='h-9 w-9' fill='none'>
          <feature.icon />
        </svg>
      </div>
      <h3
        className={clsx(
          'mt-6 text-sm font-medium',
          isActive ? 'text-blue-600' : 'text-slate-600'
        )}
      >
        {feature.name}
      </h3>
      <p className='mt-2 font-display text-xl text-slate-900'>
        {feature.summary}
      </p>
      <p className='mt-4 text-sm text-slate-600'>{feature.description}</p>
    </div>
  )


}

export default Feature
