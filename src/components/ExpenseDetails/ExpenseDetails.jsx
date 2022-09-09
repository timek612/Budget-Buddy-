import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
function ExpenseDetails () {

    const history = useHistory()
    const dispatch = useDispatch()
    const expense = useSelector((store) => store.expenseReducer.currentExpense)
    console.log(expense);
    
    // useEffect(() => {
    //     dispatch({
          
    //     })
    //   }, [])
    
    const editExpense = () => {
        history.push('/editExpense')
    }

    const sendBack = () => {
        history.push('/individualExpenses')
    }
    
    return (
        <div>
        <h1>Expense Details</h1>
        <button onClick={() => sendBack()}>Back</button>
        <div className='recurringExpenseDiv'>
        <p>{expense.description}</p>
        <p>{expense.date}</p>
        <p>{expense.cost}</p>
        </div>
        <button onClick={() => editExpense()}>Edit</button>
        </div>
    )
}

export default ExpenseDetails