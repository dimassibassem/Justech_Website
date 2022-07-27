import React from 'react';
import {MenuIcon} from "@heroicons/react/outline";
import {useStore} from "@/store";

function MobileTopNavigation() {
    const setMobileMenuOpen = useStore(state => state.setMobileMenuOpen);
    return (
        <div className="lg:hidden">
            <div className="bg-[#05358c] py-2 px-4 flex items-center justify-between sm:px-6">
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
                        className="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-slate-200 rounded-md text-white hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => {
                            setMobileMenuOpen(true)
                        }}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MenuIcon className="h-6 w-6 text-[#05358c]" aria-hidden="true"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MobileTopNavigation;
