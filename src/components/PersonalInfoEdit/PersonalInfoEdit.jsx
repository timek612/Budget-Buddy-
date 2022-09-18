import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
function PersonalInfoEdit() {
    const dispatch = useDispatch()
    const history = useHistory()

    const userInfo = useSelector((store) => store.moneyReducer.personalInfoReducer)
    // console.log(userInfo);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    
    const updateUserInfo = () => {
        dispatch({
            type: 'UPDATED_PERSONAL_INFO',
            payload: {
                
            }
        })
    }

    return (
        <div>
            {userInfo && userInfo.map(userInfo => {
                
                return (
                <div key={userInfo.firstname}>
                <h1 className="recurringHeader">Edit Profile Info</h1>
                <p>{userInfo.firstName}</p>
                <input type="text" placeholder="First name*"
                    className='personalInput'
                    value={userInfo.firstname}
                    required
                    onChange={(event) => setFirstName(event.target.value)}
                />
    
                <br />
    
                <input type="text" placeholder="Last name*"
                    className='personalInput'
                    value={userInfo.lastname}
                    required
                    onChange={(event) => setLastName(event.target.value)}
                />
    
                <br />
    
                <input type="number" placeholder="Age*"
                    className='personalInput'
                    value={userInfo.age}
                    required
                    onChange={(event) => setAge(event.target.value)}
                />
    
                <br />
    
                <button id='updateBtn' onClick={() => updateUserInfo()}>Update</button>
                 
                </div>
                )
            }) }
            

        </div>
    )
}

export default PersonalInfoEdit