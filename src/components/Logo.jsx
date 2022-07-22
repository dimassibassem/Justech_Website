import Image from 'next/future/image'
import Link from 'next/link'
import logo from '@/images/logos/logo.png'

export function Logo() {
  return (
    <Link name="logo" href="/">
      <Image
        className='h-20 w-auto'
        src={logo}
        alt=''
      />
    </Link>
  )
}
