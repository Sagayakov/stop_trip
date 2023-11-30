import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../widgets';
import { ToastContainer } from 'react-toastify';

export const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            <ToastContainer />
        </>
    );
};
