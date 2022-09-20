//Just the thank you page once you're done registering!
import './ThankYou.css'
import {  useHistory  }  from 'react-router-dom'
import { useDispatch } from 'react-redux';

function ThankYou () {
    const history = useHistory()
    const dispatch = useDispatch()
    
    const sendHome = () => {
        console.log('SENDING LOGIN FROM THANK YOU PAGE');
        dispatch ({
            type: 'LOGIN'
        })
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