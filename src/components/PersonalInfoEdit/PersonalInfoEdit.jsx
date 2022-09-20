//This is the page where a user can edit their personal information when logged in

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
function PersonalInfoEdit() {
    const dispatch = useDispatch()

    const userInfo = useSelector((store) => store.moneyReducer.personalInfoReducer)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    
    const updateUserInfo = () => {
        dispatch({
            type: 'UPDATED_PERSONAL_INFO',
            payload: {
                firstName,
                lastName,
                age
            }
        })
    }

    return (
        <div>
                <div key={userInfo.firstname}>
                <h1 className="recurringHeader">Edit Profile Info</h1>
                <p>{userInfo.firstName}</p>
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
    
                <button id='updateBtn' onClick={() => updateUserInfo()}>Update</button>
                 
                </div>
                
            
            

        </div>
    )
}

export default PersonalInfoEdit