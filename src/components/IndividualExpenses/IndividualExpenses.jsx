import { useHistory } from 'react-router-dom'

function IndividualExpenses () {
    const history = useHistory()
    
    const recurring = () => {
        history.push('/recurringExpenses')
    }

    const expenseClicked = () => {
        console.log('click');
        history.push('/expenseDetails')
    }
    
    return (
        <div>
        <h1>Expenses</h1>
        <h4 onClick={() => expenseClicked()}>I'm an expense</h4>
        <button onClick={() => recurring()}>Recurring</button>
        </div>

    )
}

export default IndividualExpenses