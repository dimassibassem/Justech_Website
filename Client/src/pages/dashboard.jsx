import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {
    BellIcon,
    BookmarkAltIcon,
    CashIcon,
    CogIcon,
    FireIcon,
    HomeIcon,
    InboxIcon,
    KeyIcon,
    PhotographIcon,
    SearchCircleIcon,
    UserIcon,
    ViewGridAddIcon,
    XIcon,
} from '@heroicons/react/outline'
import Link from "next/link";
import Image from "next/future/image";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import MainContent from "@/components/dashboard/MainContent";
import StaticSidebarForDesktop from "@/components/dashboard/StaticSidebarForDesktop";
import MobileTopNavigation from "@/components/dashboard/MobileTopNavigation";
import SecondarySidebar from "@/components/dashboard/SecondarySidebar";
import justech from "@/images/logos/logo.png";

const navigation = [
    {name: 'Home', href: '#', icon: HomeIcon},
    {name: 'Trending', href: '#', icon: FireIcon},
    {name: 'Bookmarks', href: '#', icon: BookmarkAltIcon},
    {name: 'Messages', href: '#', icon: InboxIcon},
    {name: 'Profile', href: '#', icon: UserIcon},
]
const subNavigation = [
    {
        name: 'Account',
        description: 'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
        href: '#',
        icon: CogIcon,
        current: true,
    },
    {
        name: 'Notifications',
        description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
        href: '#',
        icon: BellIcon,
        current: false,
    },
    {
        name: 'Security',
        description: 'Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.',
        href: '#',
        icon: KeyIcon,
        current: false,
    },
    {
        name: 'Appearance',
        description: 'Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.',
        href: '#',
        icon: PhotographIcon,
        current: false,
    },
    {
        name: 'Billing',
        description: 'Orci aliquam arcu egestas turpis cursus. Lectus faucibus netus dui auctor mauris.',
        href: '#',
        icon: CashIcon,
        current: false,
    },
    {
        name: 'Integrations',
        description: 'Nisi, elit volutpat odio urna quis arcu faucibus dui. Mauris adipiscing pellentesque.',
        href: '#',
        icon: ViewGridAddIcon,
        current: false,
    },
    {
        name: 'Additional Resources',
        description: 'Quis viverra netus donec ut auctor fringilla facilisis. Nunc sit donec cursus sit quis et.',
        href: '#',
        icon: SearchCircleIcon,
        current: false,
    },
]


        // This example requires updating your template:
        //
        // ```
        // <html class="h-full bg-blue-gray-50">
        // <body class="h-full overflow-hidden">
        // ```

export default function Dashboard() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="h-full flex bg-blue-gray-50">
                <Transition.Root show={mobileMenuOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-blue-gray-600 bg-opacity-75"/>
                        </Transition.Child>

                        <div className="fixed inset-0 flex z-40">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel
                                    className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-4">
                                            <button
                                                type="button"
                                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="pt-5 pb-4">
                                        <div className="flex-shrink-0 flex items-center px-4">
                                            <Image
                                                className="h-8 w-auto"
                                                src={justech}
                                                alt="Workflow"
                                            />
                                        </div>
                                        <nav aria-label="Sidebar" className="mt-5">
                                            <div className="px-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="group p-2 rounded-md flex items-center text-base font-medium text-blue-gray-600 hover:bg-blue-gray-50 hover:text-blue-gray-900"
                                                    >
                                                        <item.icon
                                                            className="mr-4 h-6 w-6 text-blue-gray-400 group-hover:text-blue-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="flex-shrink-0 flex border-t border-blue-gray-200 p-4">
                                        <Link href="/dashboard" className="flex-shrink-0 group block">
                                            <div className="flex items-center">
                                                <div />
                                                <div className="ml-3">
                                                    <p className="text-base font-medium text-blue-gray-700 group-hover:text-blue-gray-900">
                                                        Lisa Marie
                                                    </p>
                                                    <p className="text-sm font-medium text-blue-gray-500 group-hover:text-blue-gray-700">
                                                        Account Settings
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="flex-shrink-0 w-14" aria-hidden="true">
                                {/* Force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <StaticSidebarForDesktop navigation={navigation}/>

                <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
                    {/* Mobile top navigation */}
                    <MobileTopNavigation setMobileMenuOpen={setMobileMenuOpen}/>

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
