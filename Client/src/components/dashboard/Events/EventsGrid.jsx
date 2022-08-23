import {useEffect, useId, useState} from "react";
import ImageGallery from "react-image-gallery";
import "node_modules/react-image-gallery/styles/css/image-gallery.css";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css'
import 'swiper/css/autoplay'
import {Scrollbar} from 'swiper'
import "swiper/css/scrollbar";
import axios from "axios";
import {PencilAltIcon, TrashIcon} from "@heroicons/react/solid";
import {Button} from "@/components/Button";
import {useLocalStorage} from "@/store";

export default function EventsGrid({events, setEvents, setOpenEditModal, setEventToEdit}) {
    console.log(events);
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
    const [maxHeight, setMaxHeight] = useState(0);
    useEffect(() => {
        if (arr.length > 0) {
            const mHeight = arr.reduce((acc, curr) => acc > curr.images.length ? acc : curr.images.length
                , 0)
            setMaxHeight(mHeight * 100)
        }
    }, [events]);

    return (
        <Swiper
            spaceBetween={60}
            slidesPerView={2}
            modules={[Scrollbar]}
            autoplay
            scrollbar={{
                hide: false,
                draggable: true,
            }}
        >

            {arr?.map((item, i) => (

                <SwiperSlide key={`${id + i}`}>

                    <ImageGallery items={item.images} thumbnailPosition="bottom"
                                  additionalClass={`h-[${maxHeight - 50}px]`}/>
                    <div className="grid grid-cols-2 gap-x-4">
                        <p
                            className="mt-2 block  text-sm font-medium text-gray-900 truncate pointer-events-none">{item.event.eventName}</p>
                        <p
                            className="mt-2 block  text-sm font-medium text-gray-900 truncate pointer-events-none">{item.event.date}</p>

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
