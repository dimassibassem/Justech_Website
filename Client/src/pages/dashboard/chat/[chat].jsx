import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {firestore} from "@/utils/config";
import ForMobile from "@/components/dashboard/ForMobile";
import StaticSidebarForDesktop from "@/components/dashboard/StaticSidebarForDesktop";
import MobileTopNavigation from "@/components/dashboard/MobileTopNavigation";
import ChatSidebar from "@/components/dashboard/chat/ChatSidebar";
import ChatBox from "@/components/chat/ChatBox";
import {useLocalStorage} from "@/store";
import {checkAuth2} from "@/utils/checkAuthDashboard";

function PrivateChatRoom() {
    const router = useRouter();
    const {chat} = router.query;
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt')
    const [messages] = useCollectionData(query, {idField: 'id'});
    const filteredMessages = messages?.filter((msg) => msg.to === chat || msg.from === chat);
    const [authenticated, setAuthenticated] = useState('loading');
    const token = useLocalStorage(state => state.token);
    useEffect(() => {
        checkAuth2(setAuthenticated, router, token).catch(err => console.log(err))
    }, [authenticated]);
    if (authenticated === 'loading' || authenticated === 'false') {
        return <div/>
    }
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


                            <div className="flex-1 flex xl:overflow-hidden">
                                {/* Secondary sidebar */}
                                <ChatSidebar/>

                                {/* Main content */}

                                <ChatBox messages={filteredMessages} receiver={chat}/>
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
