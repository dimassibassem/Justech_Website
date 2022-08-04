import {useId} from "react";
import ImageGallery from "react-image-gallery";
import "node_modules/react-image-gallery/styles/css/image-gallery.css";

export default function EventsGrid({events}) {
    const id = useId()


    for (let i = 0; i < events.length; i += 1) {
        for (let j = 0; j < events[i].images.length; j += 1) {
            events[i].images[j] = `${events[i].images[j]}`.indexOf("https://localhost:7002/wwwroot/Uploads/Events/") === -1 ? `https://localhost:7002/wwwroot/Uploads/Events/${events[i].images[j]}` : events[i].images[j];
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

    return (
        <ul role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-2 xl:gap-x-8">
            {arr?.map((item, i) => (
                <li key={`${id + i}`} className="relative">
                    <ImageGallery items={item.images}/>
                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{item.event.eventName}</p>

                </li>
            ))}
        </ul>
    )
}
