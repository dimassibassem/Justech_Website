import {useId} from "react";
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay,Scrollbar } from 'swiper'
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function PartnersGrid({partners}) {
    const id = useId()
    return (
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                modules={[Scrollbar,Autoplay]}
                autoplay
                scrollbar={{
                    hide: false,
                }}
            >
            {partners?.map((partner, i) => (
                <SwiperSlide key={`${i + id}`}>

                    <div
                        className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img
                            src={`https://localhost:7002/wwwroot/Uploads/Partners/${partner.thumbnailName}`}
                            alt=""
                            className="object-cover pointer-events-none group-hover:opacity-75"/>

                    </div>
                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{partner.companyName}</p>
                <div className="mb-8" />
                </SwiperSlide>
            ))}
            </Swiper>
        // </ul>
    )
}
