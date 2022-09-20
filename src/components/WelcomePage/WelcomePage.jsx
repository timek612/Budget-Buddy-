//Nothing fancy here. Just a filler page for registering.
import './WelcomePage.css'
import { useHistory } from 'react-router-dom'

function WelcomePage () {

    const history = useHistory()

    const handleClick = () => {
        history.push('/personalForm')
    }

    return (
        <>
        <div id="welcome">
        <h1>Hi!</h1>
        <h3>We need some info from you before we get started.</h3>
        </div>
        <button id='welcomeNextBtn' onClick={() =>handleClick()}>Next</button>
        </>
        
    )
}

export default WelcomePage