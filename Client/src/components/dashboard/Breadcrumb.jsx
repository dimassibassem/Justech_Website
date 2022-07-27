import React from 'react';
import {ChevronLeftIcon} from "@heroicons/react/solid";
import Link from "next/link";

function Breadcrumb() {
    return (
        <nav aria-label="Breadcrumb" className="bg-white border-b border-blue-gray-200 xl:hidden">
            <div className="max-w-3xl mx-auto py-3 px-4 flex items-start sm:px-6 lg:px-8">
                <Link
                    href="/dashboard/account"
                    className="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900"
                >
                    <ChevronLeftIcon className="h-5 w-5 text-blue-gray-400" aria-hidden="true"/>
                    <span>Settings</span>
                </Link>
            </div>
        </nav>
    );
}

export default Breadcrumb;
