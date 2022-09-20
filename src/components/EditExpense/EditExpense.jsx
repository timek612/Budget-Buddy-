//This page is where you can edit existing expenses
//Expense data is sent here on click of edit.
import './EditExpense.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Snackbar } from "@material-ui/core"
import Select from '@material-ui/core/Select';
function EditExpense() {
    const expense = useSelector((store) => store.expenseReducer.currentExpense)
    console.log(expense);

    const [description, setDescription] = useState(expense.description);
    const [category, setCategory] = useState('')
    const [date, setDate] = useState(expense.date)
    const [total, setTotal] = useState(expense.cost)
    const [recurring, setRecurring] = useState(expense.recurring)

    const dispatch = useDispatch()
    const history = useHistory()

    const dropDownChange = (e) => {
        setCategory(e.target.value)
    
    }

    const saveEditedExpense = () => {
        let id = expense.id
        
        dispatch ({//new values are sent to a SAGA
            type: 'EDITED_EXPENSE',
            payload: {
                description,
                date,
                category,
                total,
                id,
                recurring

            }
        })
        dispatch ({//confirmation message
            type: 'SNACKBAR_MESSAGE',
            payload: {
                message: true
            }
        })
        if (recurring === false) {
            history.push('/individualExpenses')
        }
        else {
            history.push('/recurringExpenses')
        }
        
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
            <h1 className='recurringHeader'>Edit Expense</h1>
            
            <div className='recurringInputs'>

                <input type="text" placeholder="Expense*"
                    className='personalInput'
                    value={description}
                    required
                    onChange={(event) => setDescription(event.target.value)}

                />

                <br />

                <div className='test'>
                <Select name="category" 
                    value={category} onChange={dropDownChange}
                >
                    <option value="initial">Select a Category</option>
                    <option value={1}>Housing</option>
                    <option value={2}>Transportation</option>
                    <option value={3}>Food</option>
                    <option value={4}>Utilities</option>
                    <option value={5}>Clothing</option>
                    <option value={6}>Medical</option>
                    <option value={7}>Insurance</option>
                    <option value={8}>Household</option>
                    <option value={9}>Lifestyle</option>
                    <option value={10}>Debt</option>
                    <option value={11}>Education</option>
                    <option value={12}>Entertainment</option>
                    <option value={13}>Donations</option>
                </Select>
                </div>

                <br />
                <br />

                <input type="date" placeholder="Date*"
                    className='personalInput'
                    value={date}
                    required
                    onChange={(event) => setDate(event.target.value)}

                />

                <br />

                <input type="number" placeholder="Total Cost*"
                    className='personalInput'
                    value={total}
                    required
                    onChange={(event) => setTotal(event.target.value)}

                />


            </div>
            <button id='editSaveButton' onClick={() => saveEditedExpense()}>Save</button>
            <button id='editCancelButton'>Cancel</button>
            <Snackbar message='Successfully edited expense!'
            className='Snackbar'
            autoHideDuration={3000}
            open={open}
            onClose={handleClose}/>

        </div>
    )
}

export default EditExpense