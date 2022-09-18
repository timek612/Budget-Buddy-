import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Snackbar } from "@material-ui/core"

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
        history.push(`/editExpense/${expense.id}`)
        
    }

    const deleteExpense = () => {

        console.log(expense.id);
        dispatch ({
            type: 'DELETE_EXPENSE',
            payload: expense.id
        })
        dispatch({
            type:'SNACKBAR_MESSAGE',
            payload: {
                message: false
            }
        })
        history.push('/individualExpenses')
        
    }
   

    const sendBack = () => {
        history.push('/individualExpenses')
    }

    const [open, setOpen] = useState(false)
    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    
    return (
        <div>
        <h1>Expense Details</h1>
        <button onClick={() => sendBack()}>Back</button>
        <div className='recurringExpenseDiv'>
        <p>{expense.date}</p>
        <p>{expense.description}</p>
        <p>{expense.category_type}</p>
        <p>{expense.cost}</p>
        </div>
        <button onClick={() => editExpense()}>Edit</button>
        <button onClick={() => deleteExpense()}>Delete</button>
        
        <Snackbar 
        message='Expense deleted!'
        autoHideDuration={3000}
        open={open}
        onClose={handleClose}
        />

        </div>
    )
}

export default ExpenseDetails