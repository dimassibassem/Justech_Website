import React, {useEffect, useState} from 'react';
import axios from "axios";
import EventsGrid from "@/components/dashboard/Events/EventsGrid";
import {useStore} from "@/store";

function EventsMainContent() {
    const setEvents = useStore(store => store.setEvents);
    const events = useStore(store => store.events);
    const [state, setState] = useState({
        eventName: "",
        description: "",
        images: [],
        link: "",
        location: "",
    });
    const fetchEvents = async () => {
        const result = await axios.get('https://localhost:7002/api/Event/all')
        setEvents(result.data);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('EventName', state.eventName);
        formData.append('Description', state.description);
        for (let i = 0; i < state.images.length; i += 1) {
            formData.append("Images", state.images[i]);
        }
        formData.append('Link', state.link);
        formData.append('Location', state.location);
        formData.append('Id', 0);
        formData.append('Date', state.date);
        try {
            await axios.post('https://localhost:7002/api/Event/UpsertEvent', formData);
            await fetchEvents();
        } catch (err) {
            console.log(err);
        }
    }

    const fileSelectedHandler = (event) => {
        setState({...state, images: event.target.files});
    }

    const handleChange = e => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        fetchEvents().catch(e => console.log(e))
    }, []);

    useEffect(() => {

    }, [events]);
    return (

        <div className="flex-1 xl:overflow-y-auto">
            <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
                <h1 className="text-3xl font-extrabold text-blue-gray-900">Events</h1>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-6 py-6">
                        <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>
                        <p className="mt-1 text-sm text-blue-gray-500">
                            This information will be displayed publicly so be careful what
                            you share.
                        </p>
                    </div>
                </div>
                <div className="pb-4">
                    <EventsGrid events={events} setEvents={setEvents}/>
                </div>

                <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                            <h2 className="text-xl font-medium text-blue-gray-900">Add New Event</h2>
                            <p className="mt-1 text-sm text-blue-gray-500">
                                This information will be displayed publicly so be careful what
                                you share.
                            </p>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="eventName"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Event Name
                            </label>
                            <input
                                type="text"
                                name="eventName"
                                id="eventName"
                                autoComplete="given-name"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="images"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Images
                                <input
                                    type="file"
                                    name="images"
                                    id="images"
                                    autoComplete="given-name"
                                    className="mt-1 p-1 block w-full bg-white z-30 shadow-sm border-2  rounded-md text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                    multiple
                                    onChange={fileSelectedHandler}
                                />
                            </label>

                        </div>


                        <div className="sm:col-span-6">
                            <label htmlFor="description"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                name="description"
                                id="description"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                defaultValue=""
                                onChange={handleChange}
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="location"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="date"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                id="date"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />

                        </div>

                    </div>
                    <div className="pt-8 flex justify-end">
                        <button
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </form>

            </div>
        </div>

    );
}

export default EventsMainContent;
