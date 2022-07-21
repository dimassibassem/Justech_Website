import Image from 'next/future/image'
import logo from '@/images/logos/logo.png'

export function Logo(props) {
  return (
    <Image
      className="h-20 w-auto"
      src={logo}
      alt=""
      unoptimized
    />
  )
}
