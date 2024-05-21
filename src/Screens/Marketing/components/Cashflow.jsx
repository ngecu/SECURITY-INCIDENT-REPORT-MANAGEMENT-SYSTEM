const CashFlowStatement = () => {
    const cashFlowData = [
        { category: 'Operating Activities', amount: 2000 },
        { category: 'Investing Activities', amount: -1000 },
        { category: 'Financing Activities', amount: -500 },
        // Add more cash flow categories as needed
    ];

    return (
        <div>
            <h2>Cash Flow Statement</h2>
            <ul>
                {cashFlowData.map(item => (
                    <li key={item.category}>{item.category}: ${item.amount}</li>
                ))}
            </ul>
        </div>
    );
}

export default CashFlowStatement