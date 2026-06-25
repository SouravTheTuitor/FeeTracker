import AddPaymentForm from "./AddPaymentForm";

export default async function AddPaymentPage({
    params,
}: {
    params: Promise<{
        id:string;
        month: string;
    }>;
}) {
    const { id, month } = await params;

    return (
        <main>
            <h1>
                Add payment
            </h1>

            <AddPaymentForm
                studentId={id}
                defaultMonth={month}/>
        </main>
    )
}