"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignOutButton() {
    const router = useRouter();

    async function handleSignOut() {
        await supabase.auth.signOut();
        router.push("/login");
    }

    return (
        <button
            onClick={handleSignOut}
            className="bg-red-600 px-4 py-2 rounded-xl hover:bg-red-500 transition"
        >
            Sign Out
        </button>
    );
}