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
                        <div className="bg-slate-800 p-4 rounded-xl relative hover:bg-slate-700 transition">
                            <div className="absolute top-2 right-2">
                                <span className="h-3 w-3 bg-green-500 rounded-full block"></span>
                            </div>

                            <h2 className="text-bold text-lg">
                                {student.name} - Class {student.class}
                            </h2>

                            <p>
                                💸₹{student.monthly_fee}/Month
                            </p>

                            <p>
                                🗓️Joined: {student.joining_date}
                            </p>
                        </div>

                    </Link>
                ))}
            </div>
        </main>
    )
}