import React, {useEffect} from 'react';
import Link from "next/link";
import axios from "axios";
import {useStore} from "@/store";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function MessagesSidebar() {
    const messages = useStore(state => state.messages);
    const setMessages = useStore(state => state.setMessages);
    const fetchMessages = async () => {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Contact/all`);

        const messagesArr = res.data.map(message => {
            message.current = false;
            return message;
        })
        setMessages(messagesArr);
    }
    useEffect(() => {
        fetchMessages().catch(err => console.log(err));
    }, []);
    return (
        <nav
            aria-label="Sections"
            className="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col"
        >
            <div
                className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
                <p className="text-lg font-medium text-blue-gray-900">Messages</p>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                {messages?.map((item) => (
                        <Link
                            key={item.id}
                            href={`/dashboard/contact/${item.id}`}
                            className={classNames(
                                item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
                                'flex p-6 border-b border-blue-gray-200'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            <div className="ml-3 text-sm">
                                <p className="font-medium text-blue-gray-900">{item.firstName} {item.lastName}</p>
                                <p className="mt-1 text-blue-gray-500">{item.subject}</p>
                            </div>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default MessagesSidebar;
