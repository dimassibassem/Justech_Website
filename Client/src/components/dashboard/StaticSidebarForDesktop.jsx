import React from 'react';
import Link from "next/link";
import {useStore} from "@/store";

function StaticSidebarForDesktop() {
    const navigation = useStore(state => state.navigation);
    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-[5rem] ">
                <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-[#05358c]">
                    <div className="flex-1">
                        <div className=" py-4 px-2 flex items-center justify-center"/>
                        <nav aria-label="Sidebar" className="py-6 flex flex-col items-center space-y-3">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center p-4 rounded-lg text-blue-200 hover:bg-blue-700"
                                >
                                    <item.icon className="h-6 w-6" aria-hidden="true"/>
                                    <span className="sr-only">{item.name}</span>
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex pb-5 ">
                        <Link href="/dashboard/account" className="flex-shrink-0 w-full">
                            <div className="sr-only">
                                <p>Lisa Marie</p>
                                <p>Account settings</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaticSidebarForDesktop;
