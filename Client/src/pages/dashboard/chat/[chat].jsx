import React from 'react';
import {useRouter} from "next/router";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {firestore} from "@/config";
import ForMobile from "@/components/dashboard/ForMobile";
import StaticSidebarForDesktop from "@/components/dashboard/StaticSidebarForDesktop";
import MobileTopNavigation from "@/components/dashboard/MobileTopNavigation";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import ChatSidebar from "@/components/dashboard/chat/ChatSidebar";

function PrivateChatRoom() {
    const router = useRouter();
    const {chat} = router.query;
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt')
    const [messages] = useCollectionData(query, {idField: 'id'});
    const filtredMessages = messages?.filter((msg) => msg.to === chat || msg.from === chat);
    console.log(filtredMessages);
    if (chat) {
        return (
            <div className="h-full flex bg-blue-gray-50">
                {/* Adding this component ti simplify code */}
                <ForMobile/>
                {/* Static sidebar for desktop */}
                <StaticSidebarForDesktop/>

                <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
                    {/* Mobile top navigation */}
                    <MobileTopNavigation/>

                    <main className="flex-1 flex overflow-hidden">
                        <div className="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
                            {/* Breadcrumb */}
                            <Breadcrumb/>

                            <div className="flex-1 flex xl:overflow-hidden">
                                {/* Secondary sidebar */}
                                <ChatSidebar/>

                                {/* Main content */}
                                {filtredMessages?.map((msg) => <div>
                                    <div>{msg.displayName}</div>
                                    <div>{msg.text}</div>
                                </div>)}

                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
    return <div>Loading...</div>
}

export default PrivateChatRoom;