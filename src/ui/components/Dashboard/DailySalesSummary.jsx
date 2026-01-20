import React from 'react';

const DailySalesSummary = ({ revenue }) => {
  return (
    <div className="daily-sales-summary">
      <h3>Daily Sales Revenue</h3>
      <p className="revenue">${revenue.toFixed(2)}</p>
    </div>
  );
};

export default DailySalesSummary;