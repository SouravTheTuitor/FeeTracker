import { supabase } from "@/lib/supabase";
import DeleteStudentButton from "./DeleteStudentButton";

export default async function DeletePage({
    params,
}: {
    params: Promise<{id: string}>;
}) {
    const { id } = await params;

    const { data: student} = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

    if (!student){
        return <div>Student Not Found</div>
    }

    return (
        <main>
            <h1>Delete Student</h1>

            <p>
                Are you sure you want to delete:
            </p>

            <div>
                <h2>{student.name}</h2>
                <p>Class: {student.class}</p>
            </div>

            <DeleteStudentButton id={id} />
        </main>
    )
}