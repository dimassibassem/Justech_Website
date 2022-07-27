import React from 'react';
import Link from "next/link";

function StaticSidebarForDesktop({navigation}) {
    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-20">
                <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-blue-600">
                    <div className="flex-1">
                        <div className="bg-blue-700 py-4 flex items-center justify-center">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                                alt="Workflow"
                            />
                        </div>
                        <nav aria-label="Sidebar" className="py-6 flex flex-col items-center space-y-3">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center p-4 rounded-lg text-blue-200 hover:bg-blue-700"
                                >
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                    <span className="sr-only">{item.name}</span>
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex pb-5">
                        <Link href="/dashboard" className="flex-shrink-0 w-full">
                            <img
                                className="block mx-auto h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                                alt=""
                            />
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
