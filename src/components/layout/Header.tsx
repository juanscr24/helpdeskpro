interface HeaderProps {
    userName?: string;
    userEmail?: string;
}

export const Header = ({
    userName = 'Usuario',
    userEmail = 'usuario@example.com',
}: HeaderProps) => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-primary-900 flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        HelpDeskPro
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-secondary-600 flex items-center justify-center ring-2 ring-secondary-200">
                        <span className="text-white font-semibold text-sm">
                            {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};
