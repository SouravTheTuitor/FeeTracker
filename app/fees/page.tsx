import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function FeesPage() {
    const { data: students, error } = await supabase
        .from("students")
        .select("*")
        .order("class");

    if (error) {
        return (
            <div className="p-4">
                ERROR: {error.message}
            </div>
        );
    }

    return(
        <main className="m-4">
            <h1 className="flex justify-center text-2xl font-bold mb-6">
                💰Fees
            </h1>

            <div className="space-y-4">
                {students?.map((student) => (
                    <Link
                        href={`/fees/${student.id}`}
                        key={student.id}
                        className="block"
                    >
                        <h2 className="font-semibold text-lg">
                            {student.name}
                        </h2>

                            <p>Monthly Fee: ₹{student.monthly_fee}</p>
                    </Link>
                ))}
            </div>
        </main>
    )
}