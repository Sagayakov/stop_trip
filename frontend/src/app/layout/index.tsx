import { Outlet } from 'react-router-dom';
import { Footer, Header } from 'widgets';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { DevNotification } from 'features/devNotification';

export const Layout = () => (
    <>
        <DevNotification />
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
