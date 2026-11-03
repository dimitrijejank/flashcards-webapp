"use client";

import { useAuth } from "./AuthProvider";
import { RiUser3Line } from "@remixicon/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const { status, user, logout } = useAuth();
    const isLoggedIn = status === "authenticated";

    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setOpen(false);
    };
    
    return (
        <header className="w-full border-b border-indigo-800 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
                {/* logo */}
                <Link href="/"
                    className="text-xl font-semibold text-indigo-600 flex items-center gap-x-2">
                        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            alt="FONartice"
                            className="mx-auto h-10 w-auto"
                        />
                        <p>FONartice</p>
                </Link>

                {isLoggedIn ? (
                    <div className="relative z-50">
                        <button aria-label="Profil"
                            className="flex h-10 w-10 items-center cursor-pointer justify-center rounded-full bg-indigo-100 text-indigo-600 transition hover:bg-indigo-200"
                            onClick={() => setOpen((prev) => !open)}
                        >
                            <RiUser3Line className="h-6 w-6" />
                        </button>
                        <div className={`z-50  absolute right-0 top-12  min-w-[180px] rounded-md border border-black/10 bg-white p-2 text-sm shadow-md transition-all ${
                            open ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                        >
                            <span className="block px-2 py-1 text-gray-700 max-w-[140px] text-nowrap overflow-hiiden">
                                {user?.name}
                            </span>
                            <button onClick={handleLogout}
                            className="w-full text-left block rounded px-2 py-1 text-red-600 hover:bg-red-50"
                            >
                                Odjavi se
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link href="/login"
                        className="rounded text-indigo-600 px-4 py-2 text-sm font-medium hover:text-indigo-700"
                    >
                        Prijavi se
                    </Link>
                )}
            </div>
        </header>
    );
}