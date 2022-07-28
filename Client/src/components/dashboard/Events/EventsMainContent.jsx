import React from 'react';
import EventsGrid from "@/components/dashboard/Events/EventsGrid";

function EventsMainContent() {
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
                    <EventsGrid/>
                </div>

                <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                            <h2 className="text-xl font-medium text-blue-gray-900">Add New Event</h2>
                            <p className="mt-1 text-sm text-blue-gray-500">
                                This information will be displayed publicly so be careful what
                                you share.
                            </p>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="companyName"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Event Name
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                id="companyName"
                                autoComplete="given-name"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="thumbnail"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Thumbnail
                                <input
                                    type="file"
                                    name="thumbnail"
                                    id="thumbnail"
                                    autoComplete="given-name"
                                    className="mt-1 p-1 block w-full bg-white z-30 shadow-sm border-2  rounded-md text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
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
