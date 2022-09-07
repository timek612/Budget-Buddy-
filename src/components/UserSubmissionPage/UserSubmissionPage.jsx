import { useHistory } from 'react-router-dom'
import './UserSubmissionPage.css'
function UserSubmissionPage () {
   const history = useHistory()
   const handleClick = () => {
        history.push('/recurringSetup')
   }
   
   return ( <>
        <div id="submissionDiv">
        <h1>Thanks!</h1>
        <h3>Now lets hear about some recurring expenses.</h3>
        </div>
        <button id='submissionNextBtn' onClick={() => handleClick()}>Next</button>
        </>
    )
}

export default UserSubmissionPage