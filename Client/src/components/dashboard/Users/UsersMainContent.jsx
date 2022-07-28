import React from 'react';
import UsersGrid from "@/components/dashboard/Users/UsersGrid";

function UsersMainContent() {
    return (

        <div className="flex-1 xl:overflow-y-auto">
            <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">

                <h1 className="text-3xl font-extrabold text-blue-gray-900">Users</h1>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-6 py-6">
                        <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>
                        <p className="mt-1 text-sm text-blue-gray-500">
                            This information will be displayed publicly so be careful what
                            you share.
                        </p>
                    </div>
                </div>
                <div className="py-4">
                    <UsersGrid/>
                </div>

                <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                            <h2 className="text-xl font-medium text-blue-gray-900">Add New User</h2>
                            <p className="mt-1 text-sm text-blue-gray-500">
                                This information will be displayed publicly so be careful what
                                you share.
                            </p>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="first-name"
                                   className="block text-sm font-medium text-blue-gray-900">
                                First name
                            </label>
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Last name
                            </label>
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="Email"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Email
                            </label>
                            <input
                                type="text"
                                name="Email"
                                id="Email"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="confirmEmail"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Confirm the Email
                            </label>
                            <input
                                type="text"
                                name="confirmEmail"
                                id="confirmEmail"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Add a Password
                            </label>
                            <input
                                type="text"
                                name="password"
                                id="password"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="confirmPassword"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Confirm the Password
                            </label>
                            <input
                                type="text"
                                name="confirmPassword"
                                id="confirmPassword"
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

export default UsersMainContent;
