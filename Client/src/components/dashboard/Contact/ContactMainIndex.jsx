import Link from "next/link";
import {useStore} from "@/store";
import axios from "axios";
import {useEffect, useState} from "react";

export default function ContactMainIndex() {
    const messages = useStore(state => state.messages);
    const setMessages = useStore(state => state.setMessages);
    const currentMessage = useStore(state => state.currentMessage);
    const [messagesArr, setMessagesArr] = useState([]);
    const fetchMessages = async () => {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Contact/all`);

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
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div className="relative h-screen w-full overflow-hidden bg-blue-gray-50">

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


            <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
                <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
                    <svg
                        className="absolute top-12 left-full transform translate-x-32"
                        width={404}
                        height={384}
                        fill="none"
                        viewBox="0 0 404 384"
                    >
                        <defs>
                            <pattern
                                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor"/>
                            </pattern>
                        </defs>
                        <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"/>
                    </svg>
                    <svg
                        className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
                        width={404}
                        height={384}
                        fill="none"
                        viewBox="0 0 404 384"
                    >
                        <defs>
                            <pattern
                                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor"/>
                            </pattern>
                        </defs>
                        <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"/>
                    </svg>
                    <svg
                        className="absolute bottom-12 left-full transform translate-x-32"
                        width={404}
                        height={384}
                        fill="none"
                        viewBox="0 0 404 384"
                    >
                        <defs>
                            <pattern
                                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor"/>
                            </pattern>
                        </defs>
                        <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"/>
                    </svg>
                </div>
            </div>
            <div className="relative pt-8 lg:pt-16 px-4 sm:px-6 lg:px-8">
                <div className="text-lg max-w-prose mx-auto">
                    <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
             Contact
            </span>
                        <span
                            className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Messages from Contact form
            </span>
                    </h1>
                    <p className="mt-8 text-xl text-gray-500 leading-8">
                        You can read all messages from contact form here.
                    </p>
                    <p className="mt-8 text-xl text-gray-500 leading-8">
                        All messages are shown in the left sidebar.
                    </p>
                </div>
                <div className="h-full prose prose-indigo prose-lg text-gray-500 mx-auto"/>
            </div>
        </div>
    )
}
