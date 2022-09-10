import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './RecurringExpenses.css'
function RecurringExpenses () {

    const history = useHistory()
    const dispatch = useDispatch()
    const recurringExpenses = useSelector((store) => store.expenseReducer.expenseReducer)
    console.log(recurringExpenses);

    useEffect(() => {
        dispatch({
          type: 'GET_RECURRING'
        })
      }, [])

    const individualExpenses = () => {
        history.push('/individualExpenses')
    }

    const expenseClicked = (expense) => {
        console.log('click');
        dispatch ({
            type: 'SET_EXPENSE',
            payload: expense
        })
        history.push(`/expenseDetails/${expense.id}`)

    }

    return (
        <div>
        <h1 className='recurringHeader'>RecurringExpenses</h1>
        <button id='btnToIndividual' onClick={() => individualExpenses()}>Individual</button>
        <section id='list'>
            {recurringExpenses.map(expense => {
                return (
                    <div key={expense.id} className='recurringExpenseDiv' onClick={() => expenseClicked(expense)}>
                        <p>{expense.date}</p>
                        <p>{expense.description}</p>
                        <p>{expense.cost}</p>
                    </div>
                )
            })}
        </section>
        </div>
    )
}

export default RecurringExpenses