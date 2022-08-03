import {useEffect, useId} from "react";
import axios from "axios";
import {useStore} from "@/store";

export default function EventsGrid() {
    const events = useStore(store => store.events);
    const setEvents = useStore(store => store.setEvents);
    const id = useId()
    const fetchEvents = async () => {
        const result = await axios.get('https://localhost:7002/api/Event/all')
        setEvents(result.data);
    }
    useEffect(() => {
        fetchEvents().catch(e => console.log(e))
    }, []);
    return (
        <ul role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {events?.map((event, i) => (
                <li key={`${id + i}`} className="relative">
                    <div
                        className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img src={`https://localhost:7002/wwwroot/Uploads/Events/${event.images[0]}`} alt=""
                             className="object-cover pointer-events-none group-hover:opacity-75"/>

                    </div>
                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{event.eventName}</p>
                </li>
            ))}
        </ul>
    )
}
