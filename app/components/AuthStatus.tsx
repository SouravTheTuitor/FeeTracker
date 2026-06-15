"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import SignOutButton from "./SignOutButton";

export default function AuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function checkSession() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setLoggedIn(!!session);
        }

        checkSession();
    }, []);

    if (loggedIn) {
        return (
            <div className="flex justify-between items center p-4 mb-6">
                <div className="font-semibold">ADMIN 👑</div>
                <SignOutButton />
            </div>

        );
    }

    return (
        <div className="flex justify-between items-center p-4 mb-6">
            <div className="font-semibold">Guest</div>

            <Link
                href="/login"
                className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-500 transition"
            >
                Sign IN
            </Link>
        </div>
    );
}