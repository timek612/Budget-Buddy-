import './EditProfile.css'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
function EditProfile () {
    
    const dispatch = useDispatch()
    
    
    const history = useHistory()

    const personalClicked = () => {
        dispatch({
            type: 'FETCH_USER_PERSONAL_INFO'
        })

        history.push('/personalInfoEdit')
    }

    const incomeClicked = () => {
        dispatch({
            type: 'FETCH_USER_PARAMETERS'
          })
        history.push('/incomeEdit')
    }
    
    
    
    return (
    <div>
        <h1 className='recurringHeader'>Edit Profile</h1>
        <div id='buttonDiv'>
            <button id='personalInfoBtn' className='personalInput' onClick={() => personalClicked()}>Personal Information</button>
            <br />
            <br />
            <button id='incomeInfoBtn' className='personalInput' onClick={() => incomeClicked()}>Income & Savings</button>
        </div>
    </div>
    )
}

export default EditProfile