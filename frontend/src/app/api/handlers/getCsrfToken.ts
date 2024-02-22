export const getCsrfToken = () => {
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim().split('=');
        if(cookie[0] === 'csrftoken') {
            return cookie[1];
        }
    }
    return '';
}