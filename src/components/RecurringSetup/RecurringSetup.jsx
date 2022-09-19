import './RecurringSetup.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


function RecurringSetup() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [total, setTotal] = useState('')
    const [type, setType] = useState(true)

    const dropDownChange = (e) => {
        setCategory(e.target.value)
    
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
    }

    const handleNext = () => {
        history.push('/thankYou')
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
            <div className='editBtns'>
            <button className='plusButton' onClick={() => handleAdd()}>+</button>
            </div>
            <button id='recurringNextBtn' onClick={() => handleNext()}>Next</button>
        </>
    )
}

export default RecurringSetup