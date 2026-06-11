"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { join } from "path";


export default function AddStudentPage() {
    const [name, setName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [school, setSchool] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [fee, setFee] = useState("");

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit() {
        if (loading) return;
        setLoading(true);

        try {

        if(
            !name.trim() ||
            !studentClass.trim() ||
            !school.trim() ||
            !joiningDate.trim() ||
            !fee.trim()
        ) {
            alert("Please fill all fields");
            return;
        }

        const {error} = await supabase.from("students")
            .insert({
                name,
                class: studentClass,
                school,
                joining_date: joiningDate,
                monthly_fee: Number(fee),
                status: "Average",
            });

        if (error) {
            alert(error.message);
            return;
        }

        setName("");
        setStudentClass("");
        setSchool("");
        setFee("");

        router.push("/students");
        router.refresh();
    } finally {
        setLoading(false);
    }
}

    return(
        <main className="p-4">
            <h1 className="flex text-2xl font-bold mb-6 justify-center">
                Add Student
            </h1>

            <div className="space-y-4">
                <input type="text" 
                placeholder="Student Name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
                className="w-full p-3 rounded-xl bg-slate-800"
                />
                
                <input type="text" 
                placeholder="Class"
                value={studentClass}
                onChange={(e) => {
                    setStudentClass(e.target.value)
                }}
                className="w-full p-3 rounded-xl bg-slate-800"
                />
                
                <input type="text" 
                placeholder="School"
                value={school}
                onChange={(e) => {
                    setSchool(e.target.value)
                }}
                className="w-full p-3 rounded-xl bg-slate-800"
                />

                <input 
                    type="date" 
                    value={joiningDate}
                    onChange={(e) => {
                        setJoiningDate(e.target.value)
                    }}
                    className="w-full p-3 rounded-xl bg-slate-800"
                />
                
                <input type="text" 
                placeholder="Monthly Fee"
                value={fee}
                onChange={(e) => {
                    setFee(e.target.value)
                }}
                className="w-full p-3 rounded-xl bg-slate-800"
                />
                
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 p-3 rounded-xl disabled:opacity-50"
                >
                {loading ? "Adding..." : "Add Student"}
                </button>
            </div>
        </main>
    )
}