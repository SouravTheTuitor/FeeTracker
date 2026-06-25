import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function MonthPage({
    params,
}: {
    params: Promise<{
        id: string;
        month: string
    }>;
}) {
    const {id, month} = await params;

    const { data: student } = await supabase 
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

    const { data: payments} = await supabase
        .from("payments")
        .select("*")
        .eq("student_id", id)
        .eq("payment_month", month);

    if (!student) {
        return (
            <div className="p-4">
                Student Not found
            </div>
        );
    }

    const totalReceived = payments?.reduce(
        (sum, payment) => sum + payment.amount,
        0
    ) || 0;

    const pending = Math.max(
        student.monthly_fee - totalReceived,
        0
    );

    return (
        <main className="p-4">
            <Link
                href={`/fees/${id}`}
                className="text-blue-500 mb-4 inline-block"
                > ← Back to Fees</Link>
            
            <div className="bg-slate-800 p-4 rounded-xl mb-6 text-center">
                <h1 className="text-2xl font-bold mb-2">
                    {month}
                </h1>

                <p>
                    Student: {student.name}
                </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-800 p-4 rounded-xl text-center">
                    <p className="text-xs text-slate-400">
                        Fee
                    </p>

                    <p className="font-bold text-lg">
                        ₹{student.monthly_fee}
                    </p>
                    
                </div>

                <div className="bg-slate-800 p-4 rounded-xl text-center">
                    <p className="text-xs text-slate-400">
                        Received
                    </p>

                    <p className="font-bold text-lg text-green-400">
                        ₹{totalReceived}
                    </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl text-center">
                    <p className="text-xs text-slate-400">
                        Pending
                    </p>

                    <p  className="font-bold text-lg text-red-400">
                        ₹{pending}
                    </p>
                </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl mb-6">
                <h2 className="font-semibold mb-6">
                    Transaction
                </h2>

                {payments?.length === 0 && (
                    <p className="text-slate-400">
                        No payments yet.
                    </p>
                )}

                {payments?.map((payment) => (
                    <div
                        key={payment.id}
                        className="border-b border-slate-700 py-3"
                    >
                        <p>
                            ₹{payment.amount}
                        </p>

                        <p className="text-sm text-slate-400">
                            {payment.payment_method}
                        </p>
                    </div>
                ))}
            </div>

            <Link
                href={`/fees/${id}/${month}/add`}
                className="block w-full bg-green-600 p-4 rounded-xl text-center"
                >
                    Add payment
                </Link>
        </main>
    )
}