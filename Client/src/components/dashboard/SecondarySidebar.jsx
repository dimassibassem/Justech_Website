import React from 'react';
import Link from "next/link";
import {useStore} from "@/store";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function SecondarySidebar({subNavigation}) {
    const resetSubNavigation = useStore(state => state.resetSubNavigation);
    return (

        <nav
            aria-label="Sections"
            className="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 lg:flex lg:flex-col"
        >
            <div
                className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
                <p className="text-lg font-medium text-blue-gray-900">Settings</p>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                {subNavigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
                            'flex p-6 border-b border-blue-gray-200'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        onClick={() => {
                            resetSubNavigation();
                        }
                        }
                    >
                        <item.icon className="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400"
                                   aria-hidden="true"/>
                        <div className="ml-3 text-sm">
                            <p className="font-medium text-blue-gray-900">{item.name}</p>
                            <p className="mt-1 text-blue-gray-500">{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default SecondarySidebar;
