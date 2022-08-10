import {useEffect} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import StaticSidebarForDesktop from "@/components/dashboard/StaticSidebarForDesktop";
import MobileTopNavigation from "@/components/dashboard/MobileTopNavigation";
import ForMobile from "@/components/dashboard/ForMobile";
import MessagesSidebar from "@/components/dashboard/Contact/MessagesSidebar";
import MessageDetails from "@/components/dashboard/Contact/MessageDetails";
import {useStore} from "@/store";


export default function ContactId() {
    const setCurrentMessage = useStore(state => state.setCurrentMessage);
    const currentMessage = useStore(state => state.currentMessage);
    const router = useRouter();
    const {contactId} = router.query;
    const fetechMessage = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Contact/GetContactBy?field=id&value=${contactId}`)
        setCurrentMessage(res.data)
    }
    useEffect(() => {
        fetechMessage().catch(err => console.log(err))
    }, [router]);


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
                            <MessagesSidebar/>

                            {/* Main content */}
                            <MessageDetails contact={currentMessage}/>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

