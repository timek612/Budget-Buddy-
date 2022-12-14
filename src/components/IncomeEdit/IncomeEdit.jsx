//This is the page where user can edit their income and savings amount
import './IncomeEdit.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
function IncomeEdit () {
    const dispatch = useDispatch()
    const history = useHistory()
      
    const moneyParams = useSelector((store) => store.moneyReducer.userParameterReducer)

    const [userIncome, setUserIncome] = useState(moneyParams.income);
    const [savings, setSavings] = useState(moneyParams.savings_amount);
    

    const updateParams = () => {
        dispatch ({
            type: 'UPDATED_USER_PARAMS',
            payload:{ userIncome,
            savings }
        })
        history.push('/user')
    }
    
    return (
        <div>

        <h1 className="recurringHeader">Edit Income</h1>
            <div className='recurringInputs'>
            <input type="number" placeholder="Annual Income*"
                    className='personalInput'
                    value={userIncome}
                    required
                    onChange={(event) => setUserIncome(event.target.value)}
                />

                <br />

                <input type="number" placeholder="Percentage to save*"
                    className='personalInput'
                    value={savings}
                    required
                    onChange={(event) => setSavings(event.target.value)}
                />
                <br />
                <button id='updateBtn' onClick={() => updateParams()}>Update</button>
            </div>
        </div>
    )    
}

export default IncomeEdit