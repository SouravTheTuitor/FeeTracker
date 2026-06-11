"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Student = {
    id: number | string;
    name: string;
    class: string;
    school: string;
    joining_date: string | null;
    monthly_fee: number;
};

export default function EditStudentForm({
    student,
}: {
    student: Student;
}) {
    const router = useRouter();

    const [name, setName] = useState(student.name);
    const [studentClass, setStudentClass] = useState(student.class);
    const [school, setSchool] = useState(student.school);
    const [joiningDate, setJoiningDate] = useState(student.joining_date || "");
    const [fee, setFee] = useState(String(student.monthly_fee));

    async function handleUpdate() {
        const { error } = await supabase
            .from("students")
            .update({
                name,
                class: studentClass,
                school,
                joining_date: joiningDate,
                monthly_fee: Number(fee),
            })
            .eq("id", student.id);

            if (error) {
                alert(error.message);
                return;
            }

            router.push(`/students/${student.id}`);
    }

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <input
                type="text"
                placeholder="Student Class"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <input
                type="text"
                placeholder="School"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <input 
                type="date" 
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <input
                type="number"
                placeholder="Monthly Fee"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="w-full p-2 border rounded"
            />

            <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Update Student
            </button>
        </div>
    );
}