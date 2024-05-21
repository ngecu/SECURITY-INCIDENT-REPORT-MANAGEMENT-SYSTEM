import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const BalanceSheet = ({ transactions }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  // Filter transactions for unpaid fees and sum the amount_remaining
  const unpaidFeesTotal = transactions
    .filter((transaction) => transaction.transactionType === 'debit' && transaction.type === 'Fee Payment')
    .reduce((total, transaction) => total + transaction.amount_remaining, 0);

  // Filter transactions for paid fees and sum the amount_paid
  const paidFeesTotal = transactions
    .filter((transaction) => transaction.transactionType === 'credit' && transaction.type === 'Fee Payment')
    .reduce((total, transaction) => total + transaction.amount_paid, 0);

  // Chart data
  const data = {
    labels: ['Paid Fees', 'Unpaid Fees'],
    datasets: [
      {
        label: 'Balance Sheet',
        data: [paidFeesTotal, unpaidFeesTotal],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Doughnut data={data} />
    </div>
  );
};

export default BalanceSheet;
