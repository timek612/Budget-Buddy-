import { useHistory } from 'react-router-dom'
function ExpenseDetails () {
    
    const history = useHistory()

    const editExpense = () => {
        history.push('/editExpense')
    }
    
    return (
        <div>
        <h1>Expense Details</h1>
        <h4>Look at me, i'm an expense</h4>
        <p>This is my description</p>
        <button onClick={() => editExpense()}>Edit</button>
        </div>
    )
}

export default ExpenseDetails