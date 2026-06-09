"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddStudentPage() {
    const [name, setName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [school, setSchool] = useState("");
    const [fee, setFee] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (loading) return;
        setLoading(true);

        try {

        if(
            !name.trim() ||
            !studentClass.trim() ||
            !school.trim() ||
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
                monthly_fee: Number(fee),
                status: "Average",
            });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Student Added!");
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
                
                <input type="text" 
                placeholder="Monthly Fee"
                value={fee}
                onChange={(e) => {
                    setFee(e.target.value)
                }}
                className="w-full p-3 rounded-xl bg-slate-800"
                />
                
                <button onClick={handleSubmit} className="w-full bg-blue-600 p-3 rounded-xl">
                    Add Student
                </button>
            </div>
        </main>
    )
}