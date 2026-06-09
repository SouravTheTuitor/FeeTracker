import { supabase } from "@/lib/supabase";
import EditStudentForm from "./EditStudentForm";

export default async function EditStudentPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { data: student} = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

    if (!student) {
        return <div className="text-2xl font-bold text-red-500">
                    Student Not Found
                </div>
    } return (
        <main>
            <h1 className="text-2xl">Edit Student</h1>
            <EditStudentForm student={student} />
        </main>
        
    );
}