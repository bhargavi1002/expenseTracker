import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer ,YAxis, XAxis} from 'recharts';
import styles from './Barchart.module.css'


const ExpenseBarChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      {data && <h2>Top Expenses</h2>}
    <div className={styles.barChartWrapper}>
    <ResponsiveContainer width={250} height={250}>
    <BarChart layout="vertical" data={data} margin={{ left: 50 }}>
    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false}   tick={{ fontSize: 12, padding: 10}} tickMargin={3} />
    <XAxis type="number" hide />
      <Bar dataKey="value" fill="#8884d8"  barSize={30} radius={[0, 20, 20, 0]}/>
    </BarChart>
  </ResponsiveContainer>
  </div>
  </div>
  );
}

export default ExpenseBarChart;
