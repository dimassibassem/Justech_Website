import create from "zustand";
import {devtools, persist} from "zustand/middleware";
import {
    AdjustmentsIcon,
    BookmarkAltIcon, CalendarIcon,
    CogIcon,
    ChatIcon,
    HomeIcon,
    InboxInIcon, UserGroupIcon,
    UserIcon
} from "@heroicons/react/outline";

const navigation = [
    {name: 'Home', href: '/', icon: HomeIcon},
    {name: 'Chat', href: '/dashboard/chat', icon: ChatIcon},
    {name: 'Messages', href: '/dashboard/contact', icon: InboxInIcon},
    {name: 'Profile', href: '/dashboard', icon: UserIcon},
]

const subNavigation = [
    {
        name: 'Account',
        description: 'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
        href: '/dashboard/account',
        icon: CogIcon,
        current: false,
    },
    {
        name: 'Users',
        description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
        href: '/dashboard/users',
        icon: AdjustmentsIcon,
        current: false,
    },
    {
        name: 'Partners',
        description: 'Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.',
        href: '/dashboard/partners',
        icon: UserGroupIcon,
        current: false,
    },
    {
        name: 'Events',
        description: 'Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.',
        href: '/dashboard/events',
        icon: CalendarIcon,
        current: false,
    },

]

const createStateSlice = (set, get) => ({
    subNavigation,
    navigation,
    mobileMenuOpen: false,
    setMobileMenuOpen: (bool) => set({mobileMenuOpen: bool}, null, "setMobileMenuOpen"),
    resetSubNavigation: () => set({
        subNavigation: subNavigation.map((elem) => {
                elem.current = false;
                return elem;
            }
        )
    }, null, "resetSubNavigation"),
    partners: [],
    setPartners: (partners) => set({partners}, null, "setPartners"),
    events: [],
    setEvents: (events) => set({events}, null, "setEvents"),
    messages: [],
    setMessages: (messages) => set({messages}, null, "setMessages"),
    currentMessage: {},
    setCurrentMessage: (message) => set({currentMessage: message}, null, "setCurrentMessage"),

})
const createTokenSlice = (set, get) => ({
    token: null,
    setToken: (token) => set({token}, null, "setToken"),
});

const createRootStorage = (set, get) => ({
    ...createTokenSlice(set, get)
})

export const useLocalStorage = create(devtools(persist(createRootStorage, {name: "token"})))

const createRootSlice = (set, get) => ({
    ...createStateSlice(set, get),
});

export const useStore = create(devtools(createRootSlice))
