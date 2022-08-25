import React, {useEffect, useState} from 'react';
import axios from "axios";
import Link from "next/link";
import {useLocalStorage, useStore} from "@/store";
import classNames from "@/utils/classNames";
import ReferenceGrid from "@/components/dashboard/References/ReferenceGrid";
import EditReferenceModal from "@/components/dashboard/References/EditReferenceModal";

function PartnersMainContent() {
    const token = useLocalStorage(store => store.token);
    const [state, setState] = useState({
        ReferenceName: "",
        ReferenceLogo: ""
    });
    const references = useStore(store => store.references);
    const setReferences = useStore(store => store.setReferences);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [referenceToEdit, setReferenceToEdit] = useState({});

    const fetchData = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/References/all`);
        setReferences(res.data);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('ReferenceName', state.ReferenceName);
        formData.append('Thumbnail', state.ReferenceLogo);
        formData.append('ThumbnailName', " ");
        formData.append('Id', 0);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/References/UpsertReference`, formData, {
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
        setState({...state, ReferenceLogo: event.target.files[0]});
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
    }, [references, referenceToEdit]);


    const subNavigation = useStore(store => store.subNavigation);
    const resetSubNavigation = useStore(store => store.resetSubNavigation);
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
                <div className="flex px-4 w-screen flex-row overflow-y-auto">
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
                            }}>
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
                <h1 className="text-3xl font-extrabold text-blue-gray-900">References</h1>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-6 py-6">
                        <h2 className="text-xl font-medium text-blue-gray-900">Add New Reference</h2>
                        <p className="mt-1 text-sm text-blue-gray-500">
                            By adding a reference you can add a reference to your website.
                        </p>
                    </div>
                </div>
                <div className="pb-4">
                    <ReferenceGrid setReferenceToEdit={setReferenceToEdit} setReferences={setReferences}
                                   setOpenEditModal={setOpenEditModal} references={references}/>
                </div>

                <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                            <h2 className="text-xl font-medium text-blue-gray-900">Add New Reference</h2>
                            <p className="mt-1 text-sm text-blue-gray-500">
                                This information will be displayed publicly so be careful what
                                you share.
                            </p>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="ReferenceName"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Reference Name
                            </label>
                            <input
                                type="text"
                                name="ReferenceName"
                                id="ReferenceName"
                                autoComplete="given-name"
                                className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="ReferenceLogo"
                                   className="block text-sm font-medium text-blue-gray-900">
                                Reference Logo
                            </label>
                            <input
                                type="file"
                                name="ReferenceLogo"
                                id="ReferenceLogo"
                                autoComplete="given-name"
                                className="mt-1 p-1 block w-full bg-white z-30 shadow-sm border-2 border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={fileSelectedHandler}
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
            <EditReferenceModal referenceToEdit={referenceToEdit} setOpenEditModal={setOpenEditModal}
                                openEditModal={openEditModal} setReferences={setReferences}/>
        </div>

    );
}

export default PartnersMainContent;
