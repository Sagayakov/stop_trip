import { AppRouter } from './app/router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { BrowserRouter } from 'react-router-dom';
import '../i18next';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
