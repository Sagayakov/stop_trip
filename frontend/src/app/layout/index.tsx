import { Outlet } from 'react-router-dom';
import { Footer, Header } from 'widgets';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';

export const Layout = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<LoadingWithBackground />}>
                <main>
                    <Outlet />
                </main>
            </Suspense>
            <Footer />
            <ToastContainer autoClose={10000} />
        </>
    );
};
