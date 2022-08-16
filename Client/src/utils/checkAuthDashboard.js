import {tokenValid} from "@/utils/token";

export async function checkAuth(setAuthenticated, token, router, resetSubNavigation, subNavigation, index) {
    if (!tokenValid(token)) {
        setAuthenticated('false');
        await router.push('/login');
    } else {
        setAuthenticated('true');
        resetSubNavigation();
        subNavigation[index].current = true;
    }
}


export async function checkAuth2(setAuthenticated, router, token) {
    if (!tokenValid(token)) {
        setAuthenticated('false');
        await router.push('/login');
    } else {
        setAuthenticated('true');
    }
}
