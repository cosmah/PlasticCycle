import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                <path d="M5 16l-2 6h18l-2-6" />
                <path d="M16.5 2A3.5 3.5 0 0 0 13 5.5V16h8.5A3.5 3.5 0 0 0 25 12.5V9a3 3 0 0 0-3-3h-2.3L16.5 2Z" stroke="none" fill="currentColor" />
                <path d="M3.22 11.8c-.3.38-.44.76-.44 1.2a3.5 3.5 0 0 0 7 0v-7.5A3.5 3.5 0 0 1 13 2c.57 0 1.13.14 1.66.42" />
                <path d="m3 15 8-3" />
                <path d="M13 5.5v4.5" />
            </svg>
            <span className="font-semibold">PlasticCycle</span>
        </>
    );
}
