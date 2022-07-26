import React, {useEffect, useId} from 'react';
import Image from "next/future/image";
import axios from "axios";
import {Scrollbar, Navigation, Pagination, Autoplay} from 'swiper'
import {Swiper, SwiperSlide} from "swiper/react";
import background from "@/images/background-faqs.webp";
import {Container} from "@/components/Container";
import {useStore} from "@/store";
import 'swiper/css'
import 'swiper/css/pagination'
import "swiper/css/scrollbar";
import "swiper/css/navigation";

function Events() {
    const events = useStore(state => state.events)
    const setEvents = useStore(state => state.setEvents)

    const fetchEvents = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Event/all`)
        const sorted = res.data
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
        setEvents(sorted)
    }
    const arr = [];

    events.map(event =>
        arr?.push({
            event,
            images: event.images.map(img => ({
                original: `${img}`,
                thumbnail: `${img}`
            }))
        })
    )
    useEffect(() => {
        fetchEvents().catch(err => console.log(err))
    }, [])


    for (let i = 0; i < events.length; i += 1) {
        for (let j = 0; j < events[i].images.length; j += 1) {
            events[i].images[j] = `${events[i].images[j]}`.indexOf(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/wwwroot/Uploads/Events/`) === -1 ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/wwwroot/Uploads/Events/${events[i].images[j]}` : events[i].images[j];
        }
    }
    const id = useId()
    return (
        <section
            id='get-started-today'
            className='relative py-20 sm:py-32'
        >
            <Image
                className='absolute h-full w-full top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2'
                src={background}
                width="100%"
                height="100%"
                priority
                alt=''
                unoptimized
            />
            <Container className="relative">

                <div className='mx-auto max-w-xl text-center pb-10'>
                    <h2 className='font-display text-3xl tracking-tight text-gray-700 sm:text-4xl'>
                        Events
                    </h2>
                    <p className='mt-4 text-lg tracking-tight text-black '>
                        lorem ipsum dolor sit amet consectetur adipisicing elit.
                        ipsum dolor sit amet consectetur adipisicing elit.
                        ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                <Swiper
                    slidesPerView={1}
                    modules={[Scrollbar]}
                    scrollbar={{
                        hide: false,
                        draggable: true,
                    }}
                >
                    {arr.map((item, i) => (
                        <SwiperSlide key={`${id + i}`}>
                            <Swiper
                                slidesPerView={1}
                                navigation
                                loop
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={10}
                                allowTouchMove={false}
                                className="mySwiper2"
                            >
                                {item.images.map((elem, j) => (
                                    <SwiperSlide key={`${id + j + i * arr.length}`}>
                                        <div
                                            className="shadow-md group block w-full aspect-w-10 aspect-h-4 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                                            <img
                                                src={item.images[j].original}
                                                alt=""
                                                className=" pointer-events-none group-hover:opacity-75"/>

                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="pt-5 grid grid-cols-2 gap-x-4 place-items-center ">
                                <p
                                    className=" mt-2 block text-md font-medium text-gray-700 truncate pointer-events-none">{item.event.eventName}</p>
                                <p
                                    className="mt-2 block align-middle text-md font-medium text-gray-700 truncate pointer-events-none">{item.event.date}</p>
                            </div>
                            <div className="pt-5 grid grid-cols-1 place-items-center">

                                <p className="pl-16 pr-8 mt-2 block align-middle text-md font-medium text-gray-700">
                                    {item.event.description}
                                </p>
                            </div>

                            <div className="mb-8"/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </section>
    );
}

export default Events;
