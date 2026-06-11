"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const { data, error } =
            await supabase.auth.signInWithPassword({
            email,
            password,
        });

console.log("LOGIN DATA:", data);
console.log("LOGIN ERROR:", error);

        if (error) {
            console.error("LOGIN ERROR:", error);
            alert(error.message);
            return;
        }

        router.push("/");
    }

    return (
        <main className="p-4 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">
                📑 Tuition Manager
            </h1>

            <div>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    className="w-full p-3 rounded-xl bg-slate-800"
                    />
                    
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    className="w-full p-3 rounded-xl bg-slate-800"
                    />
                    
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 p-3 rounded-xl">
                        Sign in
                    </button>
            </div>
        </main>
    )
}