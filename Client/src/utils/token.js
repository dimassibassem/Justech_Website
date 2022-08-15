export function parseJwt(token) {
    if (token === null || token === undefined) {
        return null
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
    return JSON.parse(jsonPayload);
}

export function tokenValid(token) {
    if (token === null || token === undefined) {
        return false
    }
    const decodedToken = parseJwt(token);
    const now = Date.now() / 1000;
    const expiry = decodedToken.exp;
    return now < expiry;
}
