import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from './app/reducers/themeReducer';

import { recentExpenses } from './app/constants/TestData';
import { CHART_THEMES } from './app/constants/Themes';
import ChartBuilder, { chartData } from './utilities/chart';
import ExpenseItem from './components/ExpenseItem';

let Home: React.FC<{}> = function (props) {
    const recExpCanvas = useRef(null);
    const monthlyExp = useRef(null);
    const theme = useSelector(getTheme);

    useEffect(() => {
        const expenseChartData: chartData[] = recentExpenses.filter(ex => ex.amount > 0).map(ex => {
            return { label: ex.name, value: ex.amount };
        });
        const monthlyChartData: chartData[] = recentExpenses.filter(ex => ex.amount > 0).map(ex => {
            return { label: ex.name, value: ex.amount };
        });
        let chartBuilder = ChartBuilder({ colorScheme: CHART_THEMES.DEFAULT });
        let pie = chartBuilder.pieChart(recExpCanvas.current!, expenseChartData, false, 1.1, {backgroundColor: theme.prColor});
        pie.draw();

        let pieMonthly = chartBuilder.pieChart(monthlyExp.current!, monthlyChartData, false, 1.1, {backgroundColor: theme.prColor});
        pieMonthly.draw();
    }, [theme]);

    return <section id="home" className="container-fluid">
        <div className="recent-exp row">
            <div className="col-4 col-lg-6 col-md-12 mb-3">
                <h5 className="hc-text header" style={headerStyle}>Recent Expenses</h5>
                <ul className="items elevated" style={itemStyle}>
                    {recentExpenses.map(exp => <ExpenseItem key={exp.id} expense={exp} />)}
                </ul>
            </div>
            <div className="col-4 col-lg-6 col-sm-12 mb-3">
                <h5 className="mb-3">Recent Expenses</h5>
                <div className="recent-exp-pie text-center" style={pieContStyle}>
                    <canvas ref={recExpCanvas} width="250px" height="250px" id="recent-exp-canvas"></canvas>
                </div>
            </div>
            <div className="col-4 col-lg-6 col-sm-12 mb-3">
                <h5 className="mb-3">Monthly Expenses</h5>
                <div className="monthly-exp-pie text-center" style={pieContStyle}>
                    <canvas ref={monthlyExp} width="250px" height="250px" id="monthly-exp-canvas"></canvas>
                </div>
            </div>
        </div>


    </section>;
}

const headerStyle = {
    marginBottom: '1rem',
}
const itemStyle = {
    padding: '1rem',
    maxHeight: '350px',
}
const pieContStyle = {
    width: '100%',
    paddingLeft: '1rem'
}

export default Home;