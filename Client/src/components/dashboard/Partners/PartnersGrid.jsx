import {useId,} from "react";
import 'swiper/css'
import 'swiper/css/autoplay'
import {Scrollbar} from 'swiper'
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import {PencilAltIcon, TrashIcon} from "@heroicons/react/solid";
import {Button} from "@/components/Button";
import {useLocalStorage} from "@/store";

export default function PartnersGrid({partners, setPartners, setOpenEditModal, setPartnerToEdit}) {
    const id = useId()
    const token = useLocalStorage(store => store.token);
    const handleDelete = async (companyName) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Partners/DeletePartnerBy`, {
            params: {
                field: "CompanyName",
                value: companyName
            }, headers: {
                'authorization': `Bearer ${token}`,
            }

        })
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Partners/all`)
        setPartners(res.data)
    }

    const handleEdit = (partner) => {
        setOpenEditModal(true);
        setPartnerToEdit(partner);
    }

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            modules={[Scrollbar]}
            autoplay
            scrollbar={{
                hide: false,
                draggable: true,
            }}
        >
            {partners?.map((partner, i) => (
                <SwiperSlide key={`${i + id}`}>

                    <div
                        className="shadow-md group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/wwwroot/Uploads/Partners/${partner.thumbnailName}`}
                            alt=""
                            className=" pointer-events-none group-hover:opacity-75"/>

                    </div>
                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{partner.companyName}</p>
                    <div className="grid grid-cols-2">
                        <Button
                            className="mt-5 text-gray-100 bg-green-600 w-full hover:bg-green-900 hover:text-white"
                            onClick={() => handleEdit(partner)}>
                            <PencilAltIcon className="h-6 w-6"/>
                        </Button>
                        <Button
                            className="mt-5 text-gray-100 bg-red-600 w-full hover:bg-red-900 hover:text-white"
                            onClick={() => handleDelete(partner.companyName)}>
                            <TrashIcon className="h-6 w-6"/>
                        </Button>
                    </div>

                    <div className="mb-8"/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
