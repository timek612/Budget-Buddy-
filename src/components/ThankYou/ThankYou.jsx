import './ThankYou.css'
import {  useHistory  }  from 'react-router-dom'

function ThankYou () {
    const history = useHistory()
    const sendHome = () => {
        history.push('/user')
    }
    
    return (
        <>
        <div id="thanksDiv">
        <h1>Thanks!</h1>
        <br />
        <h2>You're all set.</h2>
        <br />
        <h2>Happy tracking!</h2>
        </div>
        <button id='thanksButton' onClick={() => sendHome()}>Done</button>
        </>
    )
}

export default ThankYou