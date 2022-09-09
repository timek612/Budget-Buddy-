import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
function RecurringExpenses () {

    const history = useHistory()
    const dispatch = useDispatch()
    const recurringExpenses = useSelector((store) => store.expenseReducer)
    console.log(recurringExpenses);

    useEffect(() => {
        dispatch({
          type: 'GET_RECURRING'
        })
      }, [])

    const individualExpenses = () => {
        history.push('/individualExpenses')
    }

    return (
        <div>
        <h1>RecurringExpenses</h1>
        <button onClick={() => individualExpenses()}>Individual</button>
        </div>
    )
}

export default RecurringExpenses