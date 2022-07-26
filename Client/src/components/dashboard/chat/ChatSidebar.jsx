import React from 'react';
import Link from "next/link";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {firebase} from '@/utils/config'

const firestore = firebase.firestore();

function ChatSidebar() {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt', 'desc')
    const [messages] = useCollectionData(query, {idField: 'id'});
    const filtredSender = messages?.filter((message, index) =>
        messages.findIndex(m => (m.from === message.from && m.from !== process.env.NEXT_PUBLIC_ADMIN_EMAIL)) === index);

    return (
        <nav
            aria-label="Sections"
            className="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 lg:flex lg:flex-col"
        >
            <div
                className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
                <p className="text-lg font-medium text-blue-gray-900">Messages</p>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                {filtredSender?.map((item) => (
                    <Link
                        key={item.uid}
                        href={`/dashboard/chat/${item.from}`}
                        className='hover:bg-blue-50 hover:bg-opacity-50 flex p-6 border-b border-blue-gray-200'
                    >
                        <div className="grid grid-cols-2 gap-4 ml-3 text-sm">
                            <img className="rounded-full shadow-xl w-16 h-16" src={item.photoURL} alt=""
                                 referrerPolicy="no-referrer"/>
                            <div className>
                                <p className="font-medium text-blue-gray-900">{item.displayName}</p>
                                <p className="mt-1 text-blue-gray-500">{item.text}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default ChatSidebar;
