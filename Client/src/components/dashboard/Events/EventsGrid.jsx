import {useId} from "react";
import 'swiper/css/autoplay'
import axios from "axios";
import {PencilAltIcon, TrashIcon} from "@heroicons/react/solid";
import {Swiper, SwiperSlide} from "swiper/react";
import {Scrollbar, Navigation, Pagination, Autoplay} from 'swiper'
import {Button} from "@/components/Button";
import {useLocalStorage} from "@/store";
import 'swiper/css'
import 'swiper/css/pagination'
import "swiper/css/scrollbar";
import "swiper/css/navigation";

export default function EventsGrid({events, setEvents, setOpenEditModal, setEventToEdit}) {
    const id = useId()
    for (let i = 0; i < events.length; i += 1) {
        for (let j = 0; j < events[i].images.length; j += 1) {
            events[i].images[j] = `${events[i].images[j]}`.indexOf(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/wwwroot/Uploads/Events/`) === -1 ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/wwwroot/Uploads/Events/${events[i].images[j]}` : events[i].images[j];
        }
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
    const token = useLocalStorage(state => state.token);
    const handleDelete = async (eventName) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Event/DeleteEventBy`, {
            params: {
                field: "eventName",
                value: eventName
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Event/all`)
        setEvents(res.data)
    }

    return (
        <Swiper
            slidesPerView={2}
            spaceBetween={50}
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
                    <div className="grid grid-cols-2 gap-x-4">
                        <p
                            className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{item.event.eventName}</p>
                        <p
                            className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{item.event.date}</p>

                    </div>
                    <div className="grid grid-cols-2">
                        <Button
                            className="mt-5 text-gray-100 bg-green-600 w-full hover:bg-green-900 hover:text-white"
                            onClick={() => {
                                setOpenEditModal(true)
                                setEventToEdit(item.event)
                            }}>
                            <PencilAltIcon className="h-6 w-6"/>
                        </Button>
                        <Button
                            className="mt-5 text-gray-100 bg-red-600 w-full hover:bg-red-900 hover:text-white "
                            onClick={() => handleDelete(item.event.eventName)}>
                            <TrashIcon className="h-6 w-6"/>
                        </Button>
                    </div>

                    <div className="mb-8"/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
