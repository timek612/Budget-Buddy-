import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './UserPage.css'
import BarChart from '../Chart/Chart';
const Money = require('js-money');

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const [displayedAllowance, setDisplayedAllowance] = useState(1)

  const user = useSelector((store) => store.user);
  const allowances = useSelector((store) => store.moneyReducer.calculationReducer);
  const allExpenses = useSelector((store) => store.expenseReducer.allExpenses)
  console.log(allExpenses);
  const dispatch = useDispatch()
  // console.log(allowances);


  useEffect(() => {
    dispatch({
      type: 'GET_ALLOWANCE'
    }),
      dispatch({
        type: 'GET_CHART_DATA'
      }),
      dispatch({
        type: 'GET_ALL_EXPENSES'
      })
  }, [])

  const changeAllowanceRange = () => {

    console.log('clicked');

    if (displayedAllowance < 3) {
      setDisplayedAllowance(displayedAllowance + 1)
    }
    else {
      setDisplayedAllowance(1)
    }
  }

  return (
    <div className="container">
      <h2>Welcome, {user.firstname}!</h2>
      <div id='allowanceDiv'>
        {displayedAllowance === 1 ? <>
          <div>${allowances.dailyAllowance}<p className='allowanceText'>for today</p></div>
          <div>
            <button className='btns' onClick={() => setDisplayedAllowance(2)}>Weekly</button> <></>
            <button className='btns' onClick={() => setDisplayedAllowance(3)}>Monthly</button>
          </div>
        </>
          :
          displayedAllowance === 2 ? <>
            <div>${allowances.weeklyAllowance}<p className='allowanceText'>for this week</p></div>
            <div>
              <button className='btns' onClick={() => setDisplayedAllowance(1)}>Daily</button> <></>
              <button className='btns' onClick={() => setDisplayedAllowance(3)}>Monthly</button>
            </div>
          </>
            :
            <>
              <div>${allowances.monthlyAllowance}<p className='allowanceText'>for this month</p></div>
              <div>
                <button className='btns' onClick={() => setDisplayedAllowance(1)}>Daily</button> <></>
                <button className='btns' onClick={() => setDisplayedAllowance(2)}>Weekly</button>
              </div>

            </>}
      </div>
      <div id='recentExpenses'>
        <br />
        <br />
        <h3 className='recurringHeader'>Recent Expenses</h3>
        {allExpenses.slice([allExpenses.length - 1 && allExpenses.length - 2]).map(expense => {
          return (
            <div className='recurringExpenseDiv' key={expense.id}>
              <p>{expense.date}</p>
              <p>{expense.description}</p>
              <p>{expense.category_type}</p>
              <p>${expense.cost}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}

// this allows us to use <App /> in index.js
export default UserPage;
