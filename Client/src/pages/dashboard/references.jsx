import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useLocalStorage, useStore} from "@/store";
import ForMobile from "@/components/dashboard/ForMobile";
import StaticSidebarForDesktop from "@/components/dashboard/StaticSidebarForDesktop";
import MobileTopNavigation from "@/components/dashboard/MobileTopNavigation";
import SecondarySidebar from "@/components/dashboard/SecondarySidebar";
import {checkAuth} from "@/utils/checkAuthDashboard";
import ReferencesMainContent from "@/components/dashboard/References/ReferencesMainContent";

function Partners() {
    const subNavigation = useStore(state => state.subNavigation);
    const resetSubNavigation = useStore(state => state.resetSubNavigation);
    const index = subNavigation.findIndex(item => item.name === "References");
    subNavigation[index].current = true;
    const token = useLocalStorage(state => state.token);
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState('loading');

    useEffect(() => {
        checkAuth(setAuthenticated, token, router, resetSubNavigation, subNavigation, index).catch(err => console.log(err))
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
                            <SecondarySidebar subNavigation={subNavigation}/>

                            {/* Main content */}
                            <ReferencesMainContent/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Partners;
