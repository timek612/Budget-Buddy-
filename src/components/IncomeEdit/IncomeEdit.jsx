import './IncomeEdit.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
function IncomeEdit () {
    const moneyParams = useSelector((store) => store.moneyReducer.userParameterReducer[0])
    useEffect(() => {
        dispatch({
          type: 'FETCH_USER_PARAMETERS'
        })
      }, [])

    const userId = useSelector((store) => store.user.id)
    
    const dispatch = useDispatch()

    const [userIncome, setUserIncome] = useState('');
    const [savings, setSavings] = useState('');
    
    // console.log(moneyParams);

    const updateParams = () => {
        dispatch ({
            type: 'UPDATED_USER_PARAMS',
            payload:{ userIncome,
            savings }
        })
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