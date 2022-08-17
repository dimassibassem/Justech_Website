import React, {useEffect, useState} from 'react';
import axios from "axios";
import PartnersGrid from "@/components/dashboard/Partners/PartnersGrid";
import {useLocalStorage, useStore} from "@/store";
import Link from "next/link";

function PartnersMainContent() {
    const token = useLocalStorage(store => store.token);
    const setPartners = useStore(store => store.setPartners);
    const partners = useStore(store => store.partners);
    const [state, setState] = useState({
        CompanyName: "",
        CompanyLogo: "",
        Description: "",
        Link: "",
    });

    const fetchData = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Partners/all`);
        setPartners(res.data);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('CompanyName', state.CompanyName);
        formData.append('Description', state.Description);
        formData.append('Thumbnail', state.CompanyLogo);
        formData.append('Link', state.Link);
        formData.append('ThumbnailName', " ");
        formData.append('Id', 0);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Partners/UpsertPartner`, formData, {
                headers: {
                    'authorization': `Bearer ${token}`,
                }
            });
            await fetchData();

        } catch (err) {
            console.log(err);
        }
    }
    const fileSelectedHandler = (event) => {
        setState({...state, CompanyLogo: event.target.files[0]});
    }

    const handleChange = e => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        fetchData().catch(err => console.log(err));
    }, []);

    useEffect(() => {
    }, [partners]);

const subNavigation = useStore(store => store.subNavigation);
const resetSubNavigation = useStore(store => store.resetSubNavigation);
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
                <h1 className="text-3xl font-extrabold text-blue-gray-900">Partners</h1>
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
                    <PartnersGrid partners={partners} setPartners={setPartners}/>
                </div>

                <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                            <h2 className="text-xl font-medium text-blue-gray-900">Add New Partner</h2>
                            <p className="mt-1 text-sm text-blue-gray-500">
                                This information will be displayed publicly so be careful what
                                you share.
                            </p>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="CompanyName"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Company Name
                            </label>
                            <input
                                type="text"
                                name="CompanyName"
                                id="CompanyName"
                                autoComplete="given-name"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="CompanyLogo"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Company Logo
                                <input
                                    type="file"
                                    name="CompanyLogo"
                                    id="CompanyLogo"
                                    autoComplete="given-name"
                                    className="mt-1 p-1 block w-full bg-white z-30 shadow-sm border-2 border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                    onChange={fileSelectedHandler}
                                />
                            </label>

                        </div>


                        <div className="sm:col-span-6">
                            <label htmlFor="Description"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                name="Description"
                                id="Description"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                defaultValue=""
                                onChange={handleChange}
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="Link"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Website Link
                            </label>
                            <input
                                type="text"
                                name="Link"
                                id="Link"
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

export default PartnersMainContent;
