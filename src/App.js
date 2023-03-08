import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Loading180Ring } from './assets/loading';
import './App.scss';
import './global.scss';

const Home = lazy(() => import('./components/pages/Home'));

function App() {
    return (
        <Router>
            <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_SITE_KEY} className="z-50">
                <Suspense
                    fallback={
                        <div className="v-screen h-screen flex justify-center items-center">
                            <Loading180Ring width={48} height={48} />
                        </div>
                    }
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Suspense>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 5000,
                        style: {
                            position: 'relative',
                            top: '5rem',
                            right: '.5rem',
                            margin: '5px 0',
                            padding: '.7rem 1.5rem',
                            color: '#333333',
                            fontSize: '16px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
                        },
                    }}
                />
            </GoogleReCaptchaProvider>
        </Router>
    );
}

export default App;
