import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import Image from 'next/future/image'
import Link from 'next/link'
import backgroundImage from '@/images/background-night.webp'
import { Container } from '@/components/Container'

function SwirlyDoodle({ className }) {
  return (
    <svg
      aria-hidden='true'
      viewBox='0 0 281 40'
      className={className}
      preserveAspectRatio='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z'
      />
    </svg>
  )
}


export function ContactUs() {
  return (
    <section
      id='get-started-today'
      className='relative overflow-hidden bg-blue-600 py-20'
    >
      <Image
        className='absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2'
        src={backgroundImage}
        priority
        alt=''
        unoptimized
      />
      <Container className='relative'>
        <div className='absolute inset-0'>
          <div className='absolute inset-y-0 left-0 w-1/2' />
        </div>
        <div className='text-center'>
          <h2 className='font-display text-3xl tracking-tight text-white sm:text-4xl'>
            <span className='relative whitespace-nowrap'>
              <SwirlyDoodle className='absolute top-1/2 left-0 h-[1em] w-full fill-blue-400' />
              <span className='relative'>Get in touch, </span>
            </span>{' '}
            for everyone.
          </h2>
          <p className='mt-10 text-lg text-slate-400' />
        </div>
        <div className='relative py-16 max-w-7xl mx-auto lg:grid lg:grid-cols-5'>
          <div className='bg-gray-50 py-12 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-16 xl:pr-12'>
            <div className='max-w-lg mx-auto'>
              <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
                {/* Get in touch */}
              </h2>
              <p className='mt-10 text-lg leading-6 text-gray-500'>
                Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor
                lacus
                arcu.
              </p>
              <dl className='mt-8 text-base text-gray-500'>
                <div>
                  <dt className='sr-only'>Postal address</dt>
                  <dd>
                    <p>742 Evergreen Terrace</p>
                    <p>Springfield, OR 12345</p>
                  </dd>
                </div>
                <div className='mt-6'>
                  <dt className='sr-only'>Phone number</dt>
                  <dd className='flex'>
                    <PhoneIcon className='flex-shrink-0 h-6 w-6 text-gray-400' aria-hidden='true' />
                    <span className='ml-3'>+1 (555) 123-4567</span>
                  </dd>
                </div>
                <div className='mt-3'>
                  <dt className='sr-only'>Email</dt>
                  <dd className='flex'>
                    <MailIcon className='flex-shrink-0 h-6 w-6 text-gray-400' aria-hidden='true' />
                    <span className='ml-3'>support@example.com</span>
                  </dd>
                </div>
              </dl>
              <p className='mt-6 text-base text-gray-500'>
                Looking for careers?{' '}
                <Link href='/' className='font-medium text-gray-700 underline'>
                  View all job openings
                </Link>
                .
              </p>
            </div>
          </div>

          <div className='bg-white py-6 px-2 sm:px-3 lg:col-span-3 lg:py-14 lg:px-4 xl:pl-8'>
            <iframe
                title='map'
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.1680107380157!2d10.791056915086388!3d35.7712490801733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130212ca89dbb27b%3A0x892261dadf82c4e3!2sJUSTECH!5e0!3m2!1sfr!2stn!4v1659343051034!5m2!1sfr!2stn"
                width="100%" height="500" allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </Container>
    </section>
  )
}
