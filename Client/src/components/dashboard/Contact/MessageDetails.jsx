import Link from "next/link";
import axios from "axios";
import {useEffect, useState} from "react";
import {useLocalStorage, useStore} from "@/store";
import classNames from "@/utils/classNames";

export default function MessageDetails({contact}) {
    const messages = useStore(state => state.messages);
    const setMessages = useStore(state => state.setMessages);
    const currentMessage = useStore(state => state.currentMessage);
    const [messagesArr, setMessagesArr] = useState([]);
    const token = useLocalStorage(state => state.token);
    const fetchMessages = async () => {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Contact/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setMessagesArr(res.data.map(message => {
            message.current = false;
            return message;
        }))
        setMessages(res.data);
    }

    useEffect(() => {
        fetchMessages().catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (currentMessage) {
            messagesArr.forEach(message => {
                if (message.id === currentMessage.id) {
                    message.current = true;
                }
            })
        }
        setMessages(messagesArr);
    }, [currentMessage]);


    return (
        <div className="w-full bg-blue-gray-50 pb-12 overflow-y-auto ">
            <nav
                aria-label="Sections"
                className="lg:hidden bg-white border-r border-blue-gray-200 items-center"
            >
                <div
                    className="h-16 px-6 border-b border-blue-gray-200 flex items-center">
                    <p className="text-lg font-medium text-blue-gray-900">Messages</p>
                </div>
                <div className="flex w-screen flex-row overflow-y-auto">
                    {messages?.map((item) => (
                        <Link
                            key={item.id}
                            href={`/dashboard/contact/${item.id}`}
                            className={classNames(
                                item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
                                'flex p-6 border-b border-blue-gray-200'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={() => {
                                setMessages(messages.map(message => {
                                    message.current = message.id === item.id;
                                    return message;
                                }))
                            }}
                        >
                            <div className="ml-3 text-sm">
                                <p className="font-medium text-blue-gray-900">{item.firstName} {item.lastName}</p>

                            </div>
                        </Link>
                    ))}
                </div>
            </nav>
            <div className=" px-4 pt-8 lg:pt-16  sm:px-6 lg:px-8">
                <div className="text-lg max-w-prose mx-auto">
                    <h1>

                        <span
                            className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
             {contact.subject}
            </span>
                    </h1>
                </div>
                <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                    <blockquote>
                        <p>
                            {contact.message}
                        </p>
                    </blockquote>
                    <div className="mt-10">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                            <div className="border-t-2 border-gray-100 pt-6">
                                <dt className="text-base font-medium text-gray-500">Phone:</dt>
                                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{contact.phone}</dd>
                            </div>
                            <div className="border-t-2 border-gray-100 pt-6">
                                <dt className="text-base font-medium text-gray-500">Email:</dt>
                                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{contact.email}</dd>
                            </div>
                            <div className="border-t-2 border-gray-100 pt-6">
                                <dt className="text-base font-medium text-gray-500">Address:</dt>
                                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{contact.address}</dd>
                            </div>
                            <div className="border-t-2 border-gray-100 pt-6">
                                <dt className="text-base font-medium text-gray-500">Company:</dt>
                                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{contact.company}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
