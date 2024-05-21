const IncomeStatement = () => {
    const incomeData = [
        { category: 'Fees', amount: 5000 },
      
        // Add more income categories as needed
    ];

    const expenseData = [
        { category: 'Requisitions', amount: 2000 },
        
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
                    <li key={item.category}>{item.category}: ksh.{item.amount}</li>
                ))}
            </ul>
            <h3>Expenses</h3>
            <ul>
                {expenseData.map(item => (
                    <li key={item.category}>{item.category}: ksh.{item.amount}</li>
                ))}
            </ul>
            <h3>Net Income</h3>
            <p>ksh.{netIncome}</p>
        </div>
    );
}

export default IncomeStatement