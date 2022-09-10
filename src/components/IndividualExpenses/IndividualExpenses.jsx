import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './IndividualExpenses.css'

function IndividualExpenses () {
    const history = useHistory()
    const dispatch = useDispatch()
    const individualExpenses = useSelector((store) => store.expenseReducer.expenseReducer)
    console.log(individualExpenses);
    
    useEffect(() => {
        dispatch({
          type: 'GET_INDIVIDUAL'
        })
      }, [])

    const recurring = () => {
        history.push('/recurringExpenses')
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
        <h1 className='recurringHeader'>Expenses</h1>
        {/* <h4 onClick={() => expenseClicked()}>I'm an expense</h4> */}
        <button id='btnToRecurring' onClick={() => recurring()}>Recurring</button>
        <section id='list'>
        {individualExpenses.map(expense => {
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

export default IndividualExpenses