import React, {useEffect} from 'react';
import {useStore} from "@/store";
import ForMobile from "@/components/dashboard/ForMobile";
import StaticSidebarForDesktop from "@/components/dashboard/StaticSidebarForDesktop";
import MobileTopNavigation from "@/components/dashboard/MobileTopNavigation";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import SecondarySidebar from "@/components/dashboard/SecondarySidebar";
import UsersMainContent from "@/components/dashboard/Users/UsersMainContent";


function Users() {
    const subNavigation = useStore(state => state.subNavigation);
    const resetSubNavigation = useStore(state => state.resetSubNavigation);
    const index = subNavigation.findIndex(item => item.name === "Users");
    subNavigation[index].current = true;
    useEffect(() => {
        resetSubNavigation();
        subNavigation[index].current = true;
    }, []);
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
                            <SecondarySidebar subNavigation={subNavigation}/>

                           <UsersMainContent />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )

}

export default Users;
