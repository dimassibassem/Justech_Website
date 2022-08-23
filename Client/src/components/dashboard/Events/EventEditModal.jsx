import React, {Fragment, useState} from 'react'
import {Transition} from '@headlessui/react'
import axios from "axios";
import {useLocalStorage, useStore} from "@/store";

export default function EventEditModal({setOpenEditModal, openEditModal, eventToEdit}) {
    const setEvents = useStore(store => store.setEvents);
    const token = useLocalStorage(store => store.token);
    const [state, setState] = useState({
        eventName: "",
        description: "",
        images: [],
        link: "",
        location: "",
    });
    const fetchEvents = async () => {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Event/all`)
        setEvents(result.data);
    }
    const handleDelete = async (event) => {
       await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Event/DeleteEventBy`, {
            params: {
                field: "EventName",
                value: event.eventName
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Event/all`)
        setEvents(res.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('EventName', state.eventName ? state.eventName : eventToEdit.eventName);
        formData.append('Description', state.description ? state.description : eventToEdit.description);
        for (let i = 0; i < state.images.length; i += 1) {
            formData.append("Images", state.images[i]);
        }
        formData.append('Location', state.location ? state.location : eventToEdit.location);
        formData.append('Id', 0);
        formData.append('Date', state.date ? state.date : eventToEdit.date);

        try {
            await handleDelete(eventToEdit);
            await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Event/UpsertEvent`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            await fetchEvents();
        } catch (err) {
            console.log(err);
        }
        setOpenEditModal(false);
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

    return (
        <Transition.Root show={openEditModal} as={Fragment}>
            <div className="relative z-10" onClose={setOpenEditModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div
                                className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                <div>

                                    <div className="mt-3 text-center sm:mt-5">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Edit {eventToEdit.eventName}
                                        </h3>
                                        <div className="mt-2">
                                            <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200"
                                                  onSubmit={handleSubmit}>
                                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
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
                                                            defaultValue={eventToEdit.eventName}
                                                        />
                                                    </div>

                                                    <div className="sm:col-span-6">
                                                        <label htmlFor="images"
                                                               className="block text-sm font-medium text-blue-gray-900">
                                                            Images
                                                            <input
                                                                required
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
                                                            defaultValue={eventToEdit.description}
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
                                                            defaultValue={eventToEdit.location}
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
                                                            defaultValue={eventToEdit.date}
                                                        />

                                                    </div>

                                                </div>
                                                <div
                                                    className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                                    <button
                                                        type="submit"
                                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                                        onClick={async () => {
                                                            setOpenEditModal(false)
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </div>
        </Transition.Root>
    )
}


