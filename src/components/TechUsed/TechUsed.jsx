//nothing special here. Just the page that shows what technology I used and plans for the future.
//Actually gonna take this out
import './TechUsed.css'
function TechUsed() {
    return (
        <div id='theMainDiv'>
            <h1 className='recurringHeader'>Technologies Used</h1>
            <ul>
                <li>
                    JavaScript
                </li>
                <li>
                    React.js
                </li>
                <li>
                    Node.js
                </li>
                <li>
                    Passport.js
                </li>
                <li>
                    Chart.js
                </li>
                <li>
                    Redux
                </li>
                <li>
                    Redux-Saga
                </li>
                <li>
                    PostgreSQL
                </li>
            </ul>
            <div className='main'>
                <br />
                <h2 className='recurringHeader'>What I'm proud of</h2>
                <p>The math</p>
                <br />
                <p>The chart</p>
                <br />
                <p>Completing this in 2 weeks!</p>
                <br />
                <h2 className='recurringHeader'>Looking ahead</h2>
                    <p>I plan to be able to reset daily allowances to their original values at a specific time of day/week/month.</p>
                    <br />
                    <p>I would like to make my app more user friendly.</p>
                    <br />
                    <p>I'd like to experiment with scrolling animations.</p>
                    <br />
                <h2 className='recurringHeader'>Thanks to..</h2>
                    <p>The Mitchison Cohort</p>
                    <br />
                    <p>My awesome instructors Dane and Kris</p>
                    <br />
                    <p>Everyone who joined the stream to watch our presentations!</p>
            </div>
        </div>
    )
}

export default TechUsed