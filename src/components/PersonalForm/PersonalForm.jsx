import './PersonalForm.css'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import axios from 'axios';


function PersonalForm() {
    const credentials = useSelector((store) => store.userData.registrationReducer)
    const userData = useSelector((store) => store.userData.userData)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [income, setIncome] = useState('');
    const [savings, setSavings] = useState('');

    const dispatch = useDispatch()
    const history = useHistory()



    const handleSubmit = (event) => {
        // event.preventDefault();

        dispatch ({
            type: 'REGISTER',
            payload: ({
                credentials,
                firstName, 
                lastName,
                age,
            })
            
        })
        
        dispatch ({
            type: 'MONEY_PARAMETERS',
            payload: ({
                income, 
                savings
            })
        })
      

        history.push('/userSubmissionPage')
    }

    // console.log(username.username);
    return (
        <>

            <div id='personalDiv'>
                <input type="text" placeholder="First name*"
                    className='personalInput'
                    value={firstName}
                    required
                    onChange={(event) => setFirstName(event.target.value)}
                />

                <br />

                <input type="text" placeholder="Last name*"
                    className='personalInput'
                    value={lastName}
                    required
                    onChange={(event) => setLastName(event.target.value)}
                />

                <br />

                <input type="number" placeholder="Age*"
                    className='personalInput'
                    value={age}
                    required
                    onChange={(event) => setAge(event.target.value)}
                />

                <br />

                <input type="number" placeholder="Annual Income*"
                    className='personalInput'
                    value={income}
                    required
                    onChange={(event) => setIncome(event.target.value)}
                />

                <br />

                <input type="number" placeholder="Percentage to save*"
                    className='personalInput'
                    value={savings}
                    required
                    onChange={(event) => setSavings(event.target.value)}
                />

                <br />

            </div>
            <button id="infoNext" onClick={() => handleSubmit()}>Next</button>
        </>
    )
}

export default PersonalForm 