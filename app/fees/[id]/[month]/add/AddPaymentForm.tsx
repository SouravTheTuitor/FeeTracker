"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddPaymentForm({
    studentId,
    defaultMonth,
}: {
    studentId: string;
    defaultMonth: string;
}){
    const router = useRouter();
    const [amount, setAmount] = useState("");
    const [paymentMonth, setPaymentMonth] = useState(defaultMonth);
    const [paymentMethod, setPaymentMethod] = useState("cash");

    async function handleSubmit() {
        const { error } = await supabase.from("payments").insert({
            student_id: studentId,
            amount: Number(amount),
            payment_month: paymentMonth,
            payment_method: paymentMethod,
        });

        if (error) {
            alert(error.message);
            return;
        }
        router.push(`/fees/${studentId}`);
    }

    return (
        <div>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800"
            />
            <input
                type="month"
                placeholder="Payment Month"
                value={paymentMonth}
                onChange={(e) => setPaymentMonth(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800"
            />
            <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800"
            >
                <option value="cash">Cash</option>
                <option value="Bank">Bank</option>
            </select>
            <button onClick={handleSubmit}>SAVE PAYMENT</button>
        </div>
    )
}
