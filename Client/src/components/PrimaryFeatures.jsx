import {useEffect, useState} from 'react'
import Image from 'next/future/image'
import {Tab} from '@headlessui/react'
import clsx from 'clsx'
import {Container} from '@/components/Container'
import backgroundImage from '@/images/background.webp'
import welcome from '@/images/welcome.jpg'
import slide1 from '@/images/slide1.jpg'
import slide2 from '@/images/slide2.jpg'
import slide3 from '@/images/slide3.jpg'


const features = [
    {
        title: 'Al-Fikr',
        description:
            'Al-Fikr is a full-text reference and search portal specializing in academic resources.',
        image: welcome,
        hasVideo: true,
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
        title: 'Al-Fikr Publish',
        description:
            'All of your receipts organized into one place, as long as you don\'t mind typing in the data by hand.',
        image: slide1,
        hasVideo: true,
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
        title: 'Sci-zone',
        description:
            'Sci-zone gives you access to books or scientific journals through individual subscriptions. A solution that brings together all the subscriptions that interest you on the same platform.',
        image: slide2,
        hasVideo: true,
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
        title: 'PMA',
        description:
            'Physical Medium Attachment in computer network protocols is a sublayer of physical layer Program Memory Area',
        image: slide3,
        hasVideo: false,
    }
]

export function PrimaryFeatures() {
    const [tabOrientation, setTabOrientation] = useState('horizontal')

    useEffect(() => {
        const lgMediaQuery = window.matchMedia('(min-width: 1024px)')

        function onMediaQueryChange({matches}) {
            setTabOrientation(matches ? 'vertical' : 'horizontal')
        }

        onMediaQueryChange(lgMediaQuery)
        lgMediaQuery.addEventListener('change', onMediaQueryChange)

        return () => {
            lgMediaQuery.removeEventListener('change', onMediaQueryChange)
        }
    }, [])

    return (
        <section
            id='features'
            aria-label='Features for running your books'
            className='relative overflow-hidden pt-20 pb-28 sm:py-32'
        >
            <Image
                className='absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]'
                src={backgroundImage}
                priority
                alt=''
                unoptimized
            />
            <Container className='relative'>
                <div className='max-w-2xl md:mx-auto md:text-center xl:max-w-none'>
                    <h2 className='font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl'>
                        Everything you need to run your books.
                    </h2>
                    <p className='mt-6 text-lg tracking-tight text-blue-100'>
                        Well everything you need if you aren’t that picky about minor
                        details like tax compliance.
                    </p>
                </div>
                <Tab.Group
                    as='div'
                    className='mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0'
                    vertical={tabOrientation === 'vertical'}
                >
                    {({selectedIndex}) => (
                        <>
                            <div
                                className='-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5'>
                                <Tab.List
                                    className='relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal'>
                                    {features.map((feature, featureIndex) => (
                                        <div
                                            key={feature.title}
                                            className={clsx(
                                                'group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6',
                                                selectedIndex === featureIndex
                                                    ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                                                    : 'hover:bg-white/10 lg:hover:bg-white/5'
                                            )}
                                        >
                                            <h3>
                                                <Tab
                                                    className={clsx(
                                                        'font-display text-lg [&:not(:focus-visible)]:focus:outline-none',
                                                        selectedIndex === featureIndex
                                                            ? 'text-blue-600 lg:text-white'
                                                            : 'text-blue-100 hover:text-white lg:text-white'
                                                    )}
                                                >
                                                <span
                                                    className='absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl'/>
                                                    {feature.title}
                                                </Tab>
                                            </h3>
                                            <p
                                                className={clsx(
                                                    'mt-2 hidden text-sm lg:block',
                                                    selectedIndex === featureIndex
                                                        ? 'text-white'
                                                        : 'text-blue-100 group-hover:text-white'
                                                )}
                                            >
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </Tab.List>
                            </div>
                            <Tab.Panels className='pl-5 lg:col-span-7'>
                                {features.map((feature) => (
                                    <Tab.Panel key={feature.title} unmount={false}>
                                        <div className='relative sm:px-6 lg:hidden'>
                                            <div
                                                className='absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl'/>
                                            <p className='relative mx-auto max-w-2xl text-base text-white sm:text-center'>
                                                {feature.description}
                                            </p>
                                        </div>
                                        <div
                                            className='mt-10 bg-auto overflow-hidden sm:w-auto lg:mt-0 w-full lg:w-[35rem] xl:w-[44rem]'>
                                            {feature.hasVideo ?
                                                <
                                                    iframe
                                                    className="w-full h-[70vh] lg:h-screen max-h-[35.5rem] rounded-xl"
                                                    src = "https://www.youtube.com/embed/Pur-viGH2Kw"
                                                    title = "YouTube video player"
                                                    allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen > < /iframe>  :
                                                <Image
                                                    className='w-full h-[70vh] lg:h-screen max-h-[35.5rem] rounded-xl'
                                                    src={feature.image}
                                                    alt=''
                                                    priority
                                                />}
                                        </div>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </>
                    )}
                </Tab.Group>
            </Container>
        </section>
    )
}
