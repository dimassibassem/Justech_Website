import {useEffect} from "react";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import MainContent from "@/components/dashboard/Account/MainContent";
import StaticSidebarForDesktop from "@/components/dashboard/StaticSidebarForDesktop";
import MobileTopNavigation from "@/components/dashboard/MobileTopNavigation";
import SecondarySidebar from "@/components/dashboard/SecondarySidebar";
import ForMobile from "@/components/dashboard/ForMobile";
import {useStore} from "@/store";


export default function Account() {
const resetSubNavigation = useStore(state => state.resetSubNavigation);
    const subNavigation = useStore(state => state.subNavigation);
    const index = subNavigation.findIndex(item => item.name === "Account");

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

                            {/* Main content */}
                            <MainContent/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
