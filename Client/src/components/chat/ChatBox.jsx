import React, {useEffect, useRef, useState} from 'react';
import {useCollectionData} from "react-firebase-hooks/firestore";
import Link from "next/link";
import {firebase, firestore} from "@/utils/config";

function ChatBox({messages, receiver}) {
    const [formValue, setFormValue] = useState('');
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const sendMessage = async (e) => {
        e.preventDefault();
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            displayName: process.env.NEXT_PUBLIC_ADMIN_DISPLAY_NAME,
            uid: Math.floor(Math.random() * 100000),
            photoURL: process.env.NEXT_PUBLIC_ADMIN_PHOTO_URL,
            from: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            to: receiver
        })

        setFormValue('');

    }
    useEffect(() => {
        dummy?.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const query = messagesRef.orderBy('createdAt', 'desc')
    const [allMessages] = useCollectionData(query, {idField: 'id'});
    const filtredSender = allMessages?.filter((message, index) =>
        allMessages.findIndex(m => (m.from === message.from && m.from !== process.env.NEXT_PUBLIC_ADMIN_EMAIL)) === index);

    return (
        <div className=" relative flex-1  justify-between flex flex-col h-screen ">

            <nav
                aria-label="Sections"
                className="lg:hidden bg-white border-r border-blue-gray-200 items-center"
            >
                <div
                    className="h-16 px-6 border-b border-blue-gray-200 flex items-center">
                    <p className="text-lg font-medium text-blue-gray-900">Messages</p>
                </div>
                <div className="flex bg-blue-gray-50 w-screen pb-4 flex-row overflow-y-auto">
                    {filtredSender?.map((item) => (
                        <Link
                            key={item.uid}
                            href={`/dashboard/chat/${item.from}`}
                            className='hover:bg-blue-50 hover:bg-opacity-50 flex p-6 border-b border-blue-gray-200'
                            aria-current={item.current ? 'page' : undefined}
                        >
                            <div className="grid grid-cols-1 gap-4 ml-3 text-sm">
                                <img className="rounded-full justify-self-center shadow-xl w-12 h-12" src={item.photoURL} alt=""
                                     loading="lazy"/>
                                <div>
                                    <p className="font-medium text-blue-gray-900">{item.displayName}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </nav>
            <div className="flex sm:items-center sm:p-6 justify-between py-3 border-b-2 border-gray-200">
                <div className="relative p-2 flex items-center space-x-4">
                    <div className="relative">
                        <img
                            src={messages ? messages[0]?.photoURL : ""}
                            alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full shadow-xl"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <div className="text-2xl mt-1 flex items-center">
                            <span
                                className="text-gray-700 mr-3">{messages ? messages[0]?.displayName : ""}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" overflow-auto ">
                {messages?.map((message) => {
                    if (message.from !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
                        return (
                            <div key={message.createdAt} className="flex items-end">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start py-1">
                                    <div>
                                    <span
                                        className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                        {message.text}
                                    </span>
                                    </div>
                                </div>
                                <img
                                    src={message.photoURL}
                                    alt="My profile" className="w-6 h-6 rounded-full order-1"/>
                                <span ref={dummy}/>
                            </div>
                        )
                    }
                    return (
                        <div key={message.createdAt} className="flex items-end justify-end py-1">
                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                <div>
                                    <span
                                        className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                        {message.text}
                                    </span>
                                </div>
                            </div>
                            <span ref={dummy}/>
                        </div>
                    )

                })}
            </div>

            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div className="relative ">
                    <form onSubmit={sendMessage}>
                        <input type="text" value={formValue}
                               className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-lg py-3"
                               placeholder="Write your message!"
                               onChange={(e) => setFormValue(e.target.value)}
                        />
                        <div className="absolute right-0 items-center inset-y-0 ">
                            <button type="submit"
                                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                                <span className="font-bold">Send</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="h-6 w-6 ml-2 transform rotate-90">
                                    <path
                                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ChatBox;

