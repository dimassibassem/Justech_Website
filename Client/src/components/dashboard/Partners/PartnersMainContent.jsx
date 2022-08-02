import React, {useState} from 'react';
import PartnersGrid from "@/components/dashboard/Partners/PartnersGrid";
import axios from "axios";

function PartnersMainContent() {
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
            const res = await axios.post('https://localhost:7002/api/Partners/UpsertPartner', formData
            );
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    const fileSelectedHandler = (event) => {
        setState({...state, CompanyLogo: event.target.files[0]});
    }
    const [state, setState] = useState({
        CompanyName: "",
        CompanyLogo: "",
        Description: "",
        Link: "",
    });
    const handleChange = e => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
        console.log(state)
    }
    return (

        <div className="flex-1 xl:overflow-y-auto">
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
                    <PartnersGrid/>
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
