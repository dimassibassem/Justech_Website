import React, {useEffect, useState} from 'react';
import axios from "axios";
import Link from "next/link";
import EventsGrid from "@/components/dashboard/Events/EventsGrid";
import {useLocalStorage, useStore} from "@/store";
import classNames from "@/utils/classNames";
import EventEditModal from "@/components/dashboard/Events/EventEditModal";
import ExistModal from "@/components/dashboard/Events/ExistModal";

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

    const [openEditModal, setOpenEditModal] = useState(false);
    const [eventToEdit, setEventToEdit] = useState({});
    const [existError, setExistError] = useState(false);
    const fetchEvents = async () => {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Event/all`)
        const sorted = result.data
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
        setEvents(sorted);
    }
    const token = useLocalStorage(store => store.token);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('EventName', state.eventName);
        formData.append('Description', state.description);
        for (let i = 0; i < state.images.length; i += 1) {
            formData.append("Images", state.images[i]);
        }
        formData.append('Location', state.location);
        formData.append('Id', 0);
        formData.append('Date', state.date);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Event/UpsertEvent`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (!response.data.message) {
                setExistError(true)
            } else {
                await fetchEvents()
            }
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
    const subNavigation = useStore(store => store.subNavigation);
    const resetSubNavigation = useStore(store => store.resetSubNavigation);

    return (

        <div className="flex-1 w-[20vh] xl:overflow-y-auto">

            <nav
                aria-label="Sections"
                className="lg:hidden bg-white border-r border-blue-gray-200"
            >
                <div
                    className="h-16 px-6 border-b border-blue-gray-200 flex items-center">
                    <p className="text-lg font-medium text-blue-gray-900">Settings</p>
                </div>
                <div className="flex items-center justify-between px-4 overflow-x-auto border-b border-blue-gray-200">
                    {subNavigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
                                'flex p-6 '
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={() => {
                                resetSubNavigation();
                            }
                            }
                        >
                            <item.icon className="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400"
                                       aria-hidden="true"/>
                            <div className="ml-3 text-sm">
                                <p className="font-medium text-blue-gray-900">{item.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </nav>
            <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
                <h1 className="text-3xl font-extrabold text-blue-gray-900">Events</h1>
                <div className="pb-4">
                    <EventsGrid events={events} setEvents={setEvents} setOpenEditModal={setOpenEditModal}
                                setEventToEdit={setEventToEdit}/>
                </div>

                <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                            <h2 className="text-xl font-medium text-blue-gray-900">Add New Event</h2>
                            <p className="mt-1 text-sm text-blue-gray-500">
                                By adding an event you will be able to add a new event to the website.
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
            <ExistModal open={existError} setOpen={setExistError}/>
            <EventEditModal eventToEdit={eventToEdit} setOpenEditModal={setOpenEditModal}
                            openEditModal={openEditModal}/>
        </div>

    );
}

export default EventsMainContent;
