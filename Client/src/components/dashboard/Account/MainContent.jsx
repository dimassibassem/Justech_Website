import React, {useState} from 'react';
import Link from "next/link";
import axios from "axios";
import {useLocalStorage, useStore} from "@/store";
import classNames from "@/utils/classNames";
import Modal from "@/components/dashboard/Account/Modal";

function MainContent() {
    const subNavigation = useStore(state => state.subNavigation);
    const resetSubNavigation = useStore(state => state.resetSubNavigation);
    const [state, setState] = useState({});
    const token = useLocalStorage(store => store.token);
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }
    const verifyPassword = async (password) => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Auth/verify?password=${password}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.success;
    }
    const [open, setOpen] = useState(false);
    const [modalState, setModalState] = useState({message: '', error: false});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const verify = await verifyPassword(state.currentPassword)

        if (verify) {
            if (state.newPassword === state.newPassword2) {
                const formData = new FormData();
                formData.append('Password', state.newPassword);
                formData.append('Id', 1);
                formData.append('Email', state.email);
                formData.append('FirstName', state.firstName);
                formData.append('LastName', state.lastName);

                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/user/UpdateUser`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (res.data.success) {
                    setModalState({message: 'Update success', error: false});
                    setOpen(true);

                } else {
                    setModalState({message: 'Update failed', error: true});
                    setOpen(true);
                }
            } else {
                setModalState({message: 'Password not match', error: true});
                setOpen(true);
            }
        } else {
            setModalState({message: 'Incorrect password', error: true});
            setOpen(true);
        }
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

                <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                            <h2 className="text-xl font-medium text-blue-gray-900">Update Profile</h2>
                            <p className="mt-1 text-sm text-blue-gray-500">
                               By filling out this form you will be able to update your profile.
                            </p>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="first-name"
                                   className="block text-sm font-medium text-blue-gray-900">
                                First name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="first-name"
                                autoComplete="given-name"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Last name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="last-name"
                                autoComplete="family-name"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="Email"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="Email"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                                autoComplete="email"
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="Current_password"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Current password
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                id="Current_password"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                                autoComplete="currentPassword"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="newPassword"
                                   className="block text-sm font-medium text-blue-gray-900">
                                New password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="newPassword2"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Confirm new password
                            </label>
                            <input
                                type="password"
                                name="newPassword2"
                                id="newPassword2"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                autoComplete="new-password"
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
                <Modal modalState={modalState} setModalState={setModalState} open={open} setOpen={setOpen}/>
            </div>
        </div>
    );
}

export default MainContent;
