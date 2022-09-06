import { useHistory } from 'react-router-dom'
function RecurringExpenses () {

    const history = useHistory()

    const individualExpenses = () => {
        history.push('/individualExpenses')
    }

    return (
        <div>
        <h1>RecurringExpenses</h1>
        <button onClick={() => individualExpenses()}>Individual</button>
        </div>
    )
}

export default RecurringExpenses