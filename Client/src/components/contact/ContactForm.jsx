import React, {useState} from 'react'
import axios from "axios";
import SuccessModal from "@/components/contact/SuccessModal";

function ContactForm() {
    const [showModal, setShowModal] = useState(false);
    const [state, setState] = useState({
        Id: 0,
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Company: '',
        Address: '',
        Subject: '',
        Message: ''
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('Id', state.Id);
        formData.append('FirstName', state.FirstName);
        formData.append('LastName', state.LastName);
        formData.append('Email', state.Email);
        formData.append('Phone', state.Phone);
        formData.append('Company', state.Company);
        formData.append('Address', state.Address);
        formData.append('Subject', state.Subject);
        formData.append('Message', state.Message);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Contact/UpsertContact`, formData)
        if (res.data.success) {
            setShowModal(true)
        }
    }

    return (
        <div className='py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12'>
            <h3 className='text-lg font-medium text-gray-900'>Send us a message</h3>
            <form action='#' method='POST' className='mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'
                  onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='first-name' className='block text-sm font-medium text-gray-900'>
                        First name
                    </label>
                    <div className='mt-1'>
                        <input
                            type='text'
                            name='FirstName'
                            id='first-name'
                            autoComplete='given-name'
                            className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='last-name' className='block text-sm font-medium text-gray-900'>
                        Last name
                    </label>
                    <div className='mt-1'>
                        <input
                            type='text'
                            name='LastName'
                            id='last-name'
                            autoComplete='family-name'
                            className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='Email' className='block text-sm font-medium text-gray-900'>
                        Email
                    </label>
                    <div className='mt-1'>
                        <input
                            id='Email'
                            name='Email'
                            type='Email'
                            autoComplete='Email'
                            className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <div className='flex justify-between'>
                        <label htmlFor='Phone' className='block text-sm font-medium text-gray-900'>
                            Phone
                        </label>
                    </div>
                    <div className='mt-1'>
                        <input
                            type='text'
                            name='Phone'
                            id='Phone'
                            autoComplete='tel'
                            className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                            aria-describedby='Phone-optional'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='Company' className='block text-sm font-medium text-gray-900'>
                        Company
                    </label>
                    <div className='mt-1'>
                        <input
                            id='Company'
                            name='Company'
                            type='text'
                            autoComplete='Company'
                            className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='Address' className='block text-sm font-medium text-gray-900'>
                        Address
                    </label>
                    <div className='mt-1'>
                        <input
                            id='Address'
                            name='Address'
                            type='text'
                            autoComplete='Address'
                            className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='sm:col-span-2'>
                    <label htmlFor='Subject' className='block text-sm font-medium text-gray-900'>
                        Subject
                    </label>
                    <div className='mt-1'>
                        <input
                            type='text'
                            name='Subject'
                            id='Subject'
                            className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='sm:col-span-2'>
                    <div className='flex justify-between'>
                        <label htmlFor='Message' className='block text-sm font-medium text-gray-900'>
                            Message
                        </label>
                        <span id='message-max' className='text-sm text-gray-500'>
                      Max. 500 characters
                    </span>
                    </div>
                    <div className='mt-1'>
                    <textarea
                        id='Message'
                        name='Message'
                        rows={4}
                        className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md'
                        aria-describedby='message-max'
                        defaultValue=''
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <div className='sm:col-span-2 sm:flex sm:justify-end'>
                    <button
                        type='submit'
                        className='mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#1b54a6] hover:bg-[#013888] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto'
                    >
                        Submit
                    </button>
                </div>
            </form>
            <SuccessModal open={showModal} setOpen={setShowModal}/>
        </div>
    )
}

export default ContactForm
