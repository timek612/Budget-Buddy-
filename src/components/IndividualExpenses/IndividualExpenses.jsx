import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './IndividualExpenses.css'
import { Snackbar } from "@material-ui/core"

function IndividualExpenses () {
    const history = useHistory()
    const dispatch = useDispatch()
    const individualExpenses = useSelector((store) => store.expenseReducer.expenseReducer)
    const snackbar = useSelector((store) => store.expenseReducer.snackbarReducer.message)
    console.log(snackbar);
    // console.log(individualExpenses);
    
    useEffect(() => {
        dispatch({
          type: 'GET_INDIVIDUAL'
        })
        if(snackbar === true) {
            setOpen(true)
        }
        else if(snackbar === false) {
            setOpen2(true)
        }
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

    const [open, setOpen] = useState(false) //edit message
    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const [open2, setOpen2] = useState(false) //delete message
    const handleClose2 = (event, reason) => {
        if(reason === 'clickaway') {
            return
        }
        setOpen2(false)
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
                        <p>{expense.category_type}</p>
                        <p>{expense.cost}</p>
                    </div>
                )
            })}
        </section>
        <Snackbar message='Expense edited!'
            className='Snackbar'
            autoHideDuration={3000}
            open={open}
            onClose={handleClose}/>

            <Snackbar message='Expense deleted!'
            className='Snackbar'
            autoHideDuration={3000}
            open={open2}
            onClose={handleClose2}/>
        </div>
        

    )
}

export default IndividualExpenses