import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PieController,
    SubTitle

} from 'chart.js';
import { Pie } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PieController,
    Title,
    Tooltip,
    Legend,
    SubTitle
)
const BarChart = () => {
    const userExpenseData = useSelector((store) => store.expenseReducer.chartData)
    console.log(userExpenseData);

    const [chartData, setChartData] = useState({
        datasets: [],
    })
    let housing = 0;
    let transportation = 0;
    let food = 0;
    let utilities = 0;
    let clothing = 0;
    let medical = 0;
    let insurance = 0;
    let household = 0;
    let lifestyle = 0;
    let debt = 0;
    let education = 0;
    let entertainment = 0;
    let donations = 0;

    

    const [chartOptions, setChartOptions] = useState ({})

    {userExpenseData.map(expenseData => {
        switch(expenseData.category_id) {
            case 1:
                housing = expenseData.sum
                break;
            case 2:
                transportation = expenseData.sum
                break;
            case 3:
                food = expenseData.sum
                break;
            case 4:
                utilities = expenseData.sum
                break;
            case 5: 
                clothing = expenseData.sum
                break;
            case 6:
                medical = expenseData.sum
                break;
            case 7:
                insurance = expenseData.sum
                break;
            case 8:
                household = expenseData.sum
                break;
            case 9:
                lifestyle = expenseData.sum
                break;
            case 10:
                debt = expenseData.sum
                break;
            case 11:
                education = expenseData.sum
                break;
            case 12:
                entertainment = expenseData.sum
                break;
            case 13:
                donations = expenseData.sum
                break;
        }
    })}
    

    useEffect(() => {
        setChartData({
            labels: ['Housing', 'Transportation,', 'Food', 'Utilities', 'Clothing', 'Medical', 'Insurance', 'Household', 'Lifestyle', 'Debt', 'Education', 'Entertainment', 'Donations'],
            datasets: [
                {
                    label: "Where is my money going?",
                    data: [housing, transportation, food, utilities, clothing, medical, insurance, household, lifestyle, debt, education, entertainment, donations],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(93, 33, 41, 0.2)',
                    'rgba(137, 129, 118, 0.2)',
                    'rgba(29, 30, 51, 0.2)',
                    'rgba(28, 84, 45, 0.2)',
                    'rgba(144, 70, 132, 0.2)',
                    'rgba(198, 166, 100, 0.2)',
                    'rgba(255, 69, 0, 0.2)',
                    'rgba(27, 85, 131, 0.2)',
                    'rgba(108, 59, 42, 0.2)'],

                    borderColor: ['rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(93, 33, 41, 1',
                    'rgba(137, 129, 118, 1)',
                    'rgba(29, 30, 51, 1)',
                    'rgba(28, 84, 45, 1)',
                    'rgba(144, 70, 132, 1)',
                    'rgba(198, 166, 100, 1)',
                    'rgba(255, 69, 0, 1)',
                    'rgba(27, 85, 131, 1)',
                    'rgba(108, 59, 42, 1)'],
                    borderWidth: 1,
                    outerHeight: 200,
                    outerWidth: 200

                }
            ]
        })
        setChartOptions({
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: "Where is my money going?"
                },
                subtitle: {
                    display: true,
                    text: 'CATEGORY'
                }
            }
        })
        console.log(chartData.datasets);
    }, [])
    
    
        
    
    return (
        <>
        <div>
            <Pie options={chartOptions} data={chartData}/>
        </div>
        <div>
            {/* {chartData ? chartData.datasets[0].label : <p>goon</p>} */}

        </div>
        </>

    )
}

export default BarChart