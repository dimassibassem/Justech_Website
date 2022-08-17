import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import StaticSidebarForDesktop from "@/components/dashboard/StaticSidebarForDesktop";
import MobileTopNavigation from "@/components/dashboard/MobileTopNavigation";
import ForMobile from "@/components/dashboard/ForMobile";
import ChatMainContent from "@/components/dashboard/chat/ChatMainContent";
import ChatSidebar from "@/components/dashboard/chat/ChatSidebar";
import {useLocalStorage} from "@/store";
import {checkAuth2} from "@/utils/checkAuthDashboard";


export default function Index() {
    const token = useLocalStorage(state => state.token);
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState('loading');
    useEffect(() => {
        checkAuth2(setAuthenticated, router, token).catch(err => console.log(err))
    }, [authenticated]);
    if (authenticated === 'loading' || authenticated === 'false') {
        return <div/>
    }
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
                            <ChatMainContent/>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
