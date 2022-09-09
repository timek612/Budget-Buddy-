import './NewExpense.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


function NewExpense () {
    const history = useHistory()
    const dispatch = useDispatch()

    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [total, setTotal] = useState('')
    const [type, setType] = useState('')

    const handleHome = () => {
        history.push('/user')
    }
    
    const dropDownChange = (e) => {
        setCategory(e.target.value)
    
    }

    const typeChange = (e) => {
        setType(e.target.value)
    }

    const handleAdd = () => {
        console.log('added');
        dispatch ({
            type: 'NEW_EXPENSE',
            payload: {
                description,
                category,
                date,
                total,
                type
            }
        })
        setDescription('')
        setCategory('initial')
        setDate('')
        setTotal('')
        setType('initial')
    }

    return (
        <>
            <h1 id='newExpenseHeader'>New Expense</h1>
            <br />
            <br />
            <div className='newExpenseInputs'>

                <input type="text" placeholder="Expense*"
                    className='personalInput'
                    value={description}
                    required
                    onChange={(event) => setDescription(event.target.value)}

                />

                <br />
                <br />

                <select name="category" className='personalInput' 
                id='newExpenseDropDown'
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
                <br />

                <input type="date" placeholder="Date*"
                    className='personalInput'
                    value={date}
                    required
                    onChange={(event) => setDate(event.target.value)}

                />

                <br />
                <br />

                <input type="number" placeholder="Total Cost*"
                    className='personalInput'
                    value={total}
                    required
                    onChange={(event) => setTotal(event.target.value)}

                />

                <br />
                <br />

                <select name="recurringOrIndividual" className='personalInput' 
                id='recurringOrIndividual'
                value={type} onChange={typeChange}
                >
                    <option value="initial">Select a Type</option>
                    <option value={true}>Recurring</option>
                    <option value={false}>Individual</option>
                   
                </select>


            </div>
            <button id='plusButton' onClick={() => handleAdd()}>+</button>
            <button id='recurringNextBtn' onClick={() => handleHome()}>Home</button>
        </>
    )
}

export default NewExpense