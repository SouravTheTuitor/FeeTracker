export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function StudentPage() {
  const { data: students, error } = await supabase
    .from("students")
    .select("*");

    console.log("Students:", students);
console.log("Error:", error);

  if (error) {
    return (
      <div className="p-4">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Students
        </h1>

        <Link
          href="/students/add"
          className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-500 transition"
        >
          + Add Student
        </Link>
      </div>

      {students?.length === 0 && (
        <div className="text-center text-slate-400 mt-10">
          No students found.
        </div>
      )}

      {students?.map((student) => (
        <Link
          href={`/students/${student.id}`}
          key={student.id}
          className="block"
        >
          <div className="bg-slate-800 p-4 rounded-xl mb-3 hover:bg-slate-700 transition cursor-pointer">
            <h2 className="font-semibold text-lg">
              {student.name}
            </h2>

            <p>Class: {student.class}</p>
            <p>School: {student.school}</p>
            <p>Fee: ₹{student.monthly_fee}</p>
            <p>Status: {student.status}</p>
            
          </div>
        </Link>
      ))}
    </div>
  );
}