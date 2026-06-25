import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getMonthFromJoiningDate } from "@/lib/months";

export default async function StudentFeesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("student_id", id)
    .order("payment_date", {
      ascending: false,
    });

  const totalReceived =
    payments?.reduce(
      (sum, payment) => sum + payment.amount,
      0
    ) || 0;

  const pending = student
    ? Math.max(
        student.monthly_fee - totalReceived,
        0
      )
    : 0;
  
  const months = getMonthFromJoiningDate(
    student.joining_date
  );

  if (!student) {
    return (
      <div className="p-4">
        Student Not Found
      </div>
    );
  }

  return (
    <main className="p-4">
      <Link
        href="/fees"
        className="text-blue-500 mb-4 inline-block"
      >
        ← Back to Fees
      </Link>

      <div className="bg-slate-800 p-4 rounded-xl mb-6">
        <h1 className="text-2xl font-bold mb-2">
          💰 {student.name}
        </h1>

        <p className="text-slate-400">
          📅 Joined:{" "}
          {student.joining_date ||
            "Not specified"}
        </p>

        <p className="text-slate-400">
          💵 Monthly Fee: ₹
          {student.monthly_fee}
        </p>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl mb-6">
        <h2 className="font-semibold text-lg mb-4">
          💰 Fee Summary
        </h2>

        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div>
            <p className="text-slate-400 text-sm">
              Monthly Fee
            </p>

            <p className="font-bold text-lg">
              ₹{student.monthly_fee}
            </p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">
              Received
            </p>

            <p className="font-bold text-lg text-green-400">
              ₹{totalReceived}
            </p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">
              Pending
            </p>

            <p className="font-bold text-lg text-red-400">
              ₹{pending}
            </p>
          </div>
        </div>

        <div className="text-center">
          {pending === 0 ? (
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
              🟢 Paid
            </span>
          ) : totalReceived > 0 ? (
            <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full">
              🟡 Partial
            </span>
          ) : (
            <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full">
              🔴 Not Paid
            </span>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-4 text-xl">
          Monthly Fees
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {months.map((month) => {
            const monthPayments = payments?.filter(
              (payment) => payment.payment_month === month.value
            ) || [];

            const totalReceived = monthPayments.reduce(
              (sum, payment) => sum + payment.amount,
              0
            );

            let status;
            let statusColor;

            if (
              totalReceived >= student.monthly_fee
            ) {
              status = "🟢 Paid";
              statusColor = "text-green-400";
            } else if (totalReceived >0){
              status = "🟡 Partial";
              statusColor = "text-yellow-400";
            } else {
              status = "🔴 Not Paid";
              statusColor = "text-red-400";
            }
            return (
              <Link
                key = {month.value}
                href={`/fees/${id}/${month.value}`}
                className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 transition"
              >
                <h3 className="font-semibold">
                  {month.label}
                </h3>

                <p className={`text-sm mt-2 ${statusColor}`}>
                  {status}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* <div className="bg-slate-800 p-4 rounded-xl mb-4">
        <h2 className="font-semibold mb-4">
          Payment History
        </h2>

        {payments?.length === 0 && (
          <div className="text-center py-6">
            <p className="text-4xl mb-2">
              💸
            </p>

            <p className="text-slate-400">
              No payments yet
            </p>
          </div>
        )}

        {payments?.map((payment) => (
          <div
            key={payment.id}
            className="border-b border-slate-700 py-3"
          >
            <p className="font-semibold">
              ₹{payment.amount}
            </p>

            <p className="text-sm text-slate-400">
              Method:{" "}
              {payment.payment_method}
            </p>

            <p className="text-sm text-slate-400">
              Month:{" "}
              {payment.payment_month}
            </p>
          </div>
        ))}
      </div> */}

      <Link
        href={`/fees/${id}/add`}
        className="block w-full bg-green-600 p-4 rounded-xl text-center font-semibold"
      >
        💵 Add Payment
      </Link>
    </main>
  );
}