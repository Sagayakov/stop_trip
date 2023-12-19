import { Outlet } from 'react-router-dom';
import { Footer, Header } from 'widgets';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
