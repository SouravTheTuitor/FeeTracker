export function getMonthFromJoiningDate(
    joiningDate: string
) {
    const months = [];

    const start = new Date(joiningDate);
    const current = new Date();

    const temp = new Date(
        start.getFullYear(),
        start.getMonth(),
        1
    );

    while (temp <= current) {
        months.push({
            label: temp.toLocaleDateString("default", {
                month:"long",
                year:"numeric",
            }),
            value: `${temp.getFullYear()}-${String(
                temp.getMonth()+1
            ).padStart(2,"0")}`,
        });

        temp.setMonth(temp.getMonth() + 1)
    }

    return months;
}