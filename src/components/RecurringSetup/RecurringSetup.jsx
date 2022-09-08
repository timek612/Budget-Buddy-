import './RecurringSetup.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function RecurringSetup() {
    const history = useHistory()

    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [total, setTotal] = useState('')

    const dropDownChange = (e) => {
        setCategory(e.target.value)
    
    }

    const handleAdd = () => {
        console.log('added');
    }

    const handleNext = () => {
        
    }

    // console.log(category);
    // console.log(date);
    // console.log(total);
    return (
        <>
            <h1 id="title">Recurring Expenses</h1>
            <br />
            <br />
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
                    <option value=""></option>
                    <option value="Housing">Housing</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Food">Food</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Medical">Medical</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Household">Household</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Debt">Debt</option>
                    <option value="Education">Education</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Donations">Donations</option>
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
            <button id='plusButton' onClick={() => handleAdd()}>+</button>
            <button id='recurringNextBtn' onClick={() => handleNext()}>Next</button>
        </>
    )
}

export default RecurringSetup