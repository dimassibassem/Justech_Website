import create from "zustand";
import {devtools, persist} from "zustand/middleware";
import {
    AdjustmentsIcon,
    BookmarkAltIcon, CalendarIcon,
    CogIcon,
    FireIcon,
    HomeIcon,
    InboxIcon, UserGroupIcon,
    UserIcon
} from "@heroicons/react/outline";

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
        href: '/dashboard/account',
        icon: CogIcon,
        current: false,
    },
    {
        name: 'Users',
        description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
        href: '#',
        icon: AdjustmentsIcon,
        current: false,
    },
    {
        name: 'Partners',
        description: 'Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.',
        href: '#',
        icon: UserGroupIcon,
        current: false,
    },
    {
        name: 'Events',
        description: 'Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.',
        href: '#',
        icon: CalendarIcon,
        current: false,
    },

]
// todo : work to do here

const createStateSlice = (set, get) => ({
    subNavigation,
    navigation,
    setCurrentSubNavigation: (newCurrent) => {
        subNavigation.map((elem)=> elem.current = false )
        // find index of newCurrent in subNavigation
        const index = subNavigation.findIndex(item => item.name === newCurrent.name);
        // set current subNavigation to newCurrent
        set(state => ({
            ...state,
            subNavigation: [...state.subNavigation.slice(0, index),
                {...state.subNavigation[index], current: true},
                ...state.subNavigation.slice(index + 1)]
        }))
        },
    mobileMenuOpen: false,
    setMobileMenuOpen: (bool) => set({mobileMenuOpen: bool}, null, "setMobileMenuOpen"),
})
// const createTokenSlice = (set, get) => ({
//     token: null,
//     setToken: (token) => set({token}, null, "setToken"),
// });

// const createRootStorage = (set, get) => ({
//     ...createTokenSlice(set, get)
// })
//
// export const useLocalStorage = create(devtools(persist(createRootStorage, {name: "localStorage"})))

const createRootSlice = (set, get) => ({
    ...createStateSlice(set, get),
});

export const useStore = create(devtools(createRootSlice))
