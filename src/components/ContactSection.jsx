import ContactInfo from '@/components/contact/ContactInfo'
import ContactForm from '@/components/contact/ContactForm'

export default function ContactSection() {
  return (
    <div className='bg-slate-200'>
      <div className=' max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
        <div className='relative bg-white shadow-2xl'>
          <h2 className='sr-only'>Contact us</h2>

          <div className='grid grid-cols-1 lg:grid-cols-3'>
            <ContactInfo />

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
