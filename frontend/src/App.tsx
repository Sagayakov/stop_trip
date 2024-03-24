import { AppRouter } from './app/router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { BrowserRouter } from 'react-router-dom';
import '../i18next';
import { CookieConsentPopup } from 'entity/cookieConsentPopup';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

declare global {
    interface Window {
        dataLayer: unknown[];
    }
}
function App() {
    const [isCookieAccepted, setIsCookieAccepted] = useState<boolean>(
        !!Cookies.get('user_consent')
    );
    const key = process.env.VITE_CAPTCHA_SITE_KEY as string;
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <GoogleReCaptchaProvider reCaptchaKey={key}>
                    <AppRouter />
                    </GoogleReCaptchaProvider>
                </BrowserRouter>
            </Provider>
            {!isCookieAccepted && (
                <CookieConsentPopup setIsCookieAccepted={setIsCookieAccepted} />
            )}
        </>
    );
}

export default App;
