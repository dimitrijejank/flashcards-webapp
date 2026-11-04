"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";

export type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
};

type AuthState = 
    | { status: "loading"; user: null }
    | { status: "unatuhenticated"; user: null}
    | { status: "authenticated"; user:User};

type Ctx = AuthState & {
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<Ctx | null>(null);


export function AuthProvider({children}: {children: React.ReactNode}) {
    const router = useRouter();
    //Globalno stanje autentifikacije
    const [state, setState] = useState<AuthState>({
        status: "loading",
        user: null
    });

    const refresh = useCallback(async () => {
        try {
            const res = await fetch("/api/auth/me", {
                credentials: "include",
            });
            const data = await res.json();

            if (data?.user) {
                setState({ status: "authenticated", user: data.user});
            } else {
                setState({ status: "unatuhenticated", user: null});
            }
        } catch {
            setState({ status: "unatuhenticated", user: null});
        }
    }, [])

    const logout = async () => {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setState({ status: "unatuhenticated", user:null });
        router.refresh();
    }

    useEffect(() => {
        refresh();
    }, [refresh]);

    const value = useMemo<Ctx>(
        () => ({ ...state, refresh, logout }),
        [state, refresh, logout],
    );

    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error("useAuth must be used inside <AuthProvider>");
    }

    return ctx;
}