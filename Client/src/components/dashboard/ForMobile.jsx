import {Fragment} from 'react'
import {Dialog, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";
import Image from "next/future/image";
import Link from "next/link";
import justech from "@/images/logos/logo.png";
import {useStore} from "@/store";

function ForMobile() {
    const mobileMenuOpen = useStore(state => state.mobileMenuOpen);
    const setMobileMenuOpen = useStore((state) => state.setMobileMenuOpen);
    const navigation = useStore(state => state.navigation);
    return (
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-blue-gray-600 bg-opacity-75"/>
                </Transition.Child>

                <div className="fixed inset-0 flex z-40">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel
                            className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-4">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="pt-5 pb-4">
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <Image
                                        className="h-8 w-auto"
                                        src={justech}
                                        alt="Workflow"
                                    />
                                </div>
                                <nav aria-label="Sidebar" className="mt-5">
                                    <div className="px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="group p-2 rounded-md flex items-center text-base font-medium text-blue-gray-600 hover:bg-blue-gray-50 hover:text-blue-gray-900"
                                            >
                                                <item.icon
                                                    className="mr-4 h-6 w-6 text-blue-gray-400 group-hover:text-blue-gray-500"
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                            <div className="flex-shrink-0 flex border-t border-blue-gray-200 p-4">
                                <Link href="/dashboard/account" className="flex-shrink-0 group block">
                                    <div className="flex items-center">
                                        <div/>
                                        <div className="ml-3">
                                            <p className="text-base font-medium text-blue-gray-700 group-hover:text-blue-gray-900">
                                                Lisa Marie
                                            </p>
                                            <p className="text-sm font-medium text-blue-gray-500 group-hover:text-blue-gray-700">
                                                Account Settings
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Force sidebar to shrink to fit close icon */}
                    </div>
                </div>
            </Dialog>
        </Transition.Root>

    );
}

export default ForMobile;
