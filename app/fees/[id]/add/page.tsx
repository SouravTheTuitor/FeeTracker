import AddPaymentForm from "./AddPaymentForm";

export default async function AddPaymentPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-6">
                Add Payment
            </h1>
            <AddPaymentForm studentId={id} />
        </main>
    );
}