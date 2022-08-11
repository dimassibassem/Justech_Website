import React from 'react';

function ChatBox({messages}) {
    return (
        <div className=" relative flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <img
                            src={messages[0].photoURL}
                            alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full shadow-xl"/>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <div className="text-2xl mt-1 flex items-center">
                            <span className="text-gray-700 mr-3">{messages[0].displayName}</span>
                        </div>
                    </div>
                </div>
            </div>

            {messages.map((message) => {
                if (message.from !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
                    return (
                        <div>
                            <div className="flex items-end">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
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
                            </div>
                        </div>
                    )
                }
                return (
                    <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                            <div>
                                    <span
                                        className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                        {message.text}
                                    </span>
                            </div>
                        </div>
                    </div>
                )

            })}
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div className="relative flex">

                    <input type="text" placeholder="Write your message!"
                           className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"/>
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        <button type="button"
                                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                            <span className="font-bold">Send</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="h-6 w-6 ml-2 transform rotate-90">
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ChatBox;

