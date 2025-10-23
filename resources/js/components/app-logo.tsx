import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square items-center justify-center rounded-md bg-transparent">
                <AppLogoIcon className="fill-current" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <h1 className="mb-0.5 truncate leading-tight font-semibold">
                    Belleza Total
                </h1>
                <p className="text-xs text-gray-700 dark:text-gray-400">
                    Sistema de Gestión de Salón
                </p>
            </div>
        </>
    );
}
