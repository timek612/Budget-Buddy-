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
                age
            })
            
        })
        // axios({
        //     method: 'POST',
        //     url: '/api/user/register',
        //     data: {
        //         user: credentials.username,
        //         pass: credentials.password,
        //         first: firstName,
        //         last: lastName,
        //         age: age
        //     }
        // })
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })

        history.push('/userSubmissionPage')
    }

    // console.log(username.username);
    return (
        <>

            <div>
                <input type="text" placeholder="First name*"
                    value={firstName}
                    required
                    onChange={(event) => setFirstName(event.target.value)}
                />

                <br />

                <input type="text" placeholder="Last name*"
                    value={lastName}
                    required
                    onChange={(event) => setLastName(event.target.value)}
                />

                <br />

                <input type="text" placeholder="Age*"
                    value={age}
                    required
                    onChange={(event) => setAge(event.target.value)}
                />

                <br />

            </div>
            <button id="infoNext" onClick={() => handleSubmit()}>Next</button>
        </>
    )
}

export default PersonalForm 