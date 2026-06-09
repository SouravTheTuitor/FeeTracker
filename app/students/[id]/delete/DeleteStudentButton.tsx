"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DeleteStudentButton({
    id,
}: {
    id: string;
}) {
    const router = useRouter();

    async function handleDelete() {
        const confirmed = confirm("Are you sure you want to delete this student?");

        if(!confirmed) return; 

        const { error } = await supabase
            .from("students")
            .delete()
            .eq("id", id);

        if (error) {
            alert(error.message);
            return;
        }

        router.push("/students");
    }

    return (
        <button
            onClick={handleDelete}
            className="text-red-500 mt-4 inline-block"
        >
            Delete Student
        </button>
    )
}
