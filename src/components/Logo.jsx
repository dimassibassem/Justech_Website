import Image from 'next/future/image'
import logo from '@/images/logos/logo.png'
import Link from 'next/link'

export function Logo(props) {
  return (
    <Link href={'/'}>
      <Image
      className='h-20 w-auto'
      src={logo}
      alt=''
      unoptimized
    />
    </Link>
  )
}
