import './EditExpense.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
function EditExpense() {
    const expense = useSelector((store) => store.expenseReducer.currentExpense)
    console.log(expense);

    const [description, setDescription] = useState(expense.description);
    const [category, setCategory] = useState('')
    const [date, setDate] = useState(expense.date)
    const [total, setTotal] = useState(expense.cost)

    const dispatch = useDispatch()
    const history = useHistory()

    const dropDownChange = (e) => {
        setCategory(e.target.value)
    
    }

    const saveEditedExpense = () => {
        let id = expense.id
        dispatch ({
            type: 'EDITED_EXPENSE',
            payload: {
                description,
                date,
                category,
                total,
                id

            }
        })
        history.push('/individualExpenses')
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

                <select name="category" className='personalInput'
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
                </select>

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

        </div>
    )
}

export default EditExpense