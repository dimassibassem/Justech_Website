import React from 'react';
import {MenuIcon} from "@heroicons/react/outline";

function MobileTopNavigation({setMobileMenuOpen}) {
    return (
        <div className="lg:hidden">
            <div className="bg-blue-600 py-2 px-4 flex items-center justify-between sm:px-6">
                <div>
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                        alt="Workflow"
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MobileTopNavigation;
