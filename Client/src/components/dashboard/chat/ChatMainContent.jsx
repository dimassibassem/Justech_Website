import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import {auth, firebase, firestore} from "@/utils/config";
import Link from "next/link";
import {useCollectionData} from "react-firebase-hooks/firestore";


function SignOut() {
    return auth.currentUser && (
        <button type="button"
                className="bg-red-700 rounded-2xl shadow-2xl text-white hover:bg-red-800 p-2 hover:text-gray-300"
                onClick={async () => {
                    await auth.signOut()
                }}>Sign Out</button>
    )
}


function SignIn() {
    const router = useRouter()
    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider)
        await router.reload()
    }

    return (
        <button type="button"
                className="bg-blue-900 rounded-2xl shadow-2xl text-white hover:bg-blue-800 p-2 hover:text-gray-300"
                onClick={signInWithGoogle}>Sign in with Google
        </button>
    )

}

export default function ChatMainContent() {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt', 'desc')
    const [messages] = useCollectionData(query, {idField: 'id'});
    const filtredSender = messages?.filter((message, index) =>
        messages.findIndex(m => (m.from === message.from && m.from !== process.env.NEXT_PUBLIC_ADMIN_EMAIL)) === index);
    const [user] = useAuthState(auth);

    return (
        <div className="relative h-screen w-full py-16 overflow-hidden bg-blue-gray-50">

            {user ? <nav
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
                                <img className="rounded-full justify-self-center shadow-xl w-12 h-12"
                                     src={item.photoURL} alt=""
                                     loading="lazy"/>
                                <div>
                                    <p className="font-medium text-blue-gray-900">{item.displayName}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </nav> : null}

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
            <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="text-lg max-w-prose mx-auto">
                    <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
             Chat
            </span>
                        <span
                            className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Chat with visitors
            </span>
                    </h1>
                    <p className="mt-8 text-xl text-gray-500 leading-8">
                        You can read all messages from chat here.
                    </p>
                    {user ? <SignOut/> : <SignIn/>}
                </div>
                <div className="h-full prose prose-indigo prose-lg text-gray-500 mx-auto"/>
            </div>
        </div>
    )
}
