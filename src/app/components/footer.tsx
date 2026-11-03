
export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-indigo-800 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 text-sm text-gray-600 md:flex-row md:justify-between">
                <p>© {year} FONartice</p>
            </div>
        </footer>
    );
}