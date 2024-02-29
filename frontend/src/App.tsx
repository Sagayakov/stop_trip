import { AppRouter } from './app/router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { BrowserRouter } from 'react-router-dom';
import '../i18next';
import { CookieConsentPopup } from 'entity/cookieConsentPopup';

declare global {
    interface Window {
        dataLayer: unknown[];
    }
}
function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </Provider>
            <CookieConsentPopup />
        </>
    );
}

export default App;
