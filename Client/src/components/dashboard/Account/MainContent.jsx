import React from 'react';
import Link from "next/link";
import {useStore} from "@/store";

function MainContent() {
    const subNavigation = useStore(state => state.subNavigation);
    const resetSubNavigation = useStore(state => state.resetSubNavigation);
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div className="flex-1 h-screen xl:overflow-y-auto">

            <nav
                aria-label="Sections"
                className="lg:hidden bg-white border-r border-blue-gray-200 items-center"
            >
                <div
                    className="h-16 px-6 border-b border-blue-gray-200 flex items-center">
                    <p className="text-lg font-medium text-blue-gray-900">Settings</p>
                </div>
                <div className="flex w-screen flex-row overflow-y-auto">
                    {subNavigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
                                'flex p-6 border-b border-blue-gray-200'
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
                <h1 className="text-3xl font-extrabold text-blue-gray-900">Account</h1>

                <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                            <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>
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
                            <label htmlFor="Current_password"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Current password
                            </label>
                            <input
                                type="text"
                                name="Current_password"
                                id="Current_password"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="newPassword"
                                   className="block text-sm font-medium text-blue-gray-900">
                                New password
                            </label>
                            <input
                                type="text"
                                name="newPassword"
                                id="newPassword"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="newPassword2"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Confirm new password
                            </label>
                            <input
                                type="text"
                                name="newPassword2"
                                id="newPassword2"
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

export default MainContent;
