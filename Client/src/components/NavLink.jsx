import Link from 'next/link'

export function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className='inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-[#2563eb] hover:text-slate-100'
    >
      {children}
    </Link>
  )
}
