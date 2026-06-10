export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function StudentProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: student, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !student) {
    return (
      <main className="p-4">
        <h1 className="text-2xl font-bold text-red-500">
          Student Not Found
        </h1>

        <Link
          href="/students"
          className="text-blue-500 mt-4 inline-block"
        >
          ← Back to Students
        </Link>
      </main>
    );
  }

  return (
    <main className="p-4">
      <Link
        href="/students"
        className="text-blue-500 mb-4 inline-block"
      >
        ← Back
      </Link>

      <div className="bg-slate-800 rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-4">
          👨‍🎓 {student.name}
        </h1>

        <div className="space-y-2">
          <p>
            <strong>Class:</strong> {student.class}
          </p>

          <p>
            <strong>School:</strong> {student.school}
          </p>

          <p>
            <strong>Monthly Fee:</strong> ₹{student.monthly_fee}
          </p>

          <p>
            <strong>Status:</strong> {student.status}
          </p>

          <Link
            href={`/students/${student.id}/edit`}
            className="text-blue-500 mt-2 inline-block"
          >
            ✏️ Edit Student
          </Link>

          <Link
            href={`/students/${student.id}/delete`}
            className="inline-block text-red-600 mt-2 ml-2 px-4 py-2 rounded-xl hover:bg-red-500 transition"
          >
            🗑️ Delete Student
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-xl">
          <h2 className="font-semibold">
            💰 Fee History
          </h2>

          <p className="text-slate-400 text-sm mt-2">
            Coming Soon
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <h2 className="font-semibold">
            📊 Reports
          </h2>

          <p className="text-slate-400 text-sm mt-2">
            Coming Soon
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <h2 className="font-semibold">
            📝 Notes
          </h2>

          <p className="text-slate-400 text-sm mt-2">
            Coming Soon
          </p>
        </div>

        {/* <div className="bg-slate-800 p-4 rounded-xl">
          <h2 className="font-semibold">
            ⚙ Actions
          </h2>

          <p className="text-slate-400 text-sm mt-2">
            Edit & Delete Coming Soon
          </p>
        </div> */}
      </div>
    </main>
  );
}