const IncomeStatement = () => {
    const incomeData = [
        { category: 'Sales', amount: 5000 },
        { category: 'Interest Income', amount: 300 },
        // Add more income categories as needed
    ];

    const expenseData = [
        { category: 'Salaries', amount: 2000 },
        { category: 'Rent', amount: 1000 },
        // Add more expense categories as needed
    ];

    const totalIncome = incomeData.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = expenseData.reduce((acc, curr) => acc + curr.amount, 0);
    const netIncome = totalIncome - totalExpenses;

    return (
        <div>
            <h3>Income</h3>
            <ul>
                {incomeData.map(item => (
                    <li key={item.category}>{item.category}: ${item.amount}</li>
                ))}
            </ul>
            <h3>Expenses</h3>
            <ul>
                {expenseData.map(item => (
                    <li key={item.category}>{item.category}: ${item.amount}</li>
                ))}
            </ul>
            <h3>Net Income</h3>
            <p>${netIncome}</p>
        </div>
    );
}

export default IncomeStatement