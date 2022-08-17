import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import StaticSidebarForDesktop from "@/components/dashboard/StaticSidebarForDesktop";
import MobileTopNavigation from "@/components/dashboard/MobileTopNavigation";
import ForMobile from "@/components/dashboard/ForMobile";
import MessagesSidebar from "@/components/dashboard/Contact/MessagesSidebar";
import ContactMainIndex from "@/components/dashboard/Contact/ContactMainIndex";
import {useLocalStorage} from "@/store";
import {checkAuth2} from "@/utils/checkAuthDashboard";


export default function Messages() {
    const router = useRouter();
    const token = useLocalStorage(state => state.token);
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
                            <MessagesSidebar/>

                            {/* Main content */}
                            <ContactMainIndex />

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

