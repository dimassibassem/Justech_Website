import React from 'react'
import clsx from 'clsx'


function Feature({ partner, isActive, className, ...props }) {
  return (
    <div
      className={`${clsx(className, !isActive && 'opacity-75 hover:opacity-100')} grid grid-cols-1 gap-4 p-4 `}
      {...props}
    >
      <div>
        <img src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/wwwroot/Uploads/Partners/${partner?.thumbnailName}`} alt='' />
      </div>
      <p className='mt-2 font-display text-md text-slate-800'>
        {partner?.companyName}
      </p>
    </div>
  )


}

export default Feature
