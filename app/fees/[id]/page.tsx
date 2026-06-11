import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function StudentFeesPage({
    params,
}: {
    params: Promise<{ id: string }>;
}){
    const { id } = await params;

    const { data: student, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();
    
    const { data: payments } = await supabase        
        .from("payments")
        .select("*")
        .eq("student_id", id)
        .order("payment_date", { ascending: false });

    if(!student){
        return <div className="p-4">
            Student Not Found
        </div>;
    }

    return (
        <main>
            <Link
                href="/fees"
                className="text-blue-500 mb-4 inline-block"
            >
                Back to Fees
            </Link>

            <h1 className="flex justify-center text-2xl font-bold mb-2">
                💰{student.name}
            </h1>

            <p className="mb-4">
                Joined: {student.joining_date || "Not specified"}
            </p>

            <div className="bg-slate-800 p-4 rounded-xl mb-4">
                <h2 className="font-semibold mb-2">
                    Payment History
                </h2>

                {payments?.length === 0 && (<p>No payments made yet.</p>)}

                {payments?.map((payment) => (
                    <div 
                        key={payment.id}
                        className="border-b border-slate-700"
                        >
                        <p>
                            Amount: ${payment.amount}
                        </p>
                        <p className="text-sm text-slate-400">
                            Method: {payment.payment_method}
                        </p>
                        <p className="text-sm text-slate-400">
                            Date: {payment.payment_month}
                        </p>
                    </div>
                ))}
            </div>

            <Link
                href={`/fees/${id}/add`}
                className="bg-green-600 p-3 rounded-xl text-center"
            >
                +Add Payment
            </Link>
        </main>
    )
}