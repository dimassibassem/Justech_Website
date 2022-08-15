import React, {Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import Image from "next/future/image";
import {auth, firebase, firestore} from "@/config";
import logo from "@/images/logos/logo.png";

function SignIn() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <>
            <button type="button" className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
            <p>Do not violate the community guidelines or you will be banned for life!</p>
        </>
    )

}

function SignOut() {
    return auth.currentUser && (
        <button type="button" className="rounded-full hover:bg-red-700 p-1 hover:text-white"
                onClick={() => auth.signOut()}>Sign Out</button>
    )
}


export default function SlideOverChat({open, setOpen}) {
    const [user] = useAuthState(auth);
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40 " onClose={setOpen}>
                <div className="fixed inset-0"/>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex flex-col bg-white shadow-xl">
                                        <div className="relative flex-1 pl-2 sm:pl-2">
                                            {/* Replace with your content */}

                                            <div>
                                                {user ? <VisitorChat/> : <SignIn/>}
                                            </div>
                                            {/* /End replace */}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}


function VisitorChat() {
    const [formValue, setFormValue] = useState('');
    const dummy = useRef();

    const messagesRef = firestore.collection('messages');
    const sendMessage = async (e) => {
        e.preventDefault();
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            displayName: auth.currentUser.displayName,
            uid: auth.currentUser.uid,
            photoURL: auth.currentUser.photoURL,
            from: auth.currentUser.email,
            to: process.env.NEXT_PUBLIC_ADMIN_EMAIL
        })

        setFormValue('');
    }

    const query = messagesRef.orderBy('createdAt')

    const [messages] = useCollectionData(query, {idField: 'id'});

    const filteredMessages = messages?.filter((msg) => msg.to === auth.currentUser.email || msg.from === auth.currentUser.email);

    useEffect(() => {
        dummy?.current?.scrollIntoView({behavior: 'smooth'});
    }, [filteredMessages]);
    return (
        <div className=" relative flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <Image
                            src={logo}
                            alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full shadow-xl"/>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <div className="text-2xl mt-1 flex items-center">
                            <span
                                className="text-gray-700 mr-3">Justech</span>
                            <SignOut/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-auto ">
                {filteredMessages?.map((message) => {
                    if (message.from !== auth.currentUser.email) {
                        return (
                            <div key={message.createdAt} className="flex items-end py-1">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                    <div>
                                    <span
                                        className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                        {message.text}
                                    </span>
                                    </div>
                                </div>
                                <Image
                                    src={logo}
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
                        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
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
