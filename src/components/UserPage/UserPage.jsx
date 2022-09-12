import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './UserPage.css'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const [displayedAllowance, setDisplayedAllowance] = useState(1)

  const user = useSelector((store) => store.user);
  const allowances = useSelector((store) => store.moneyReducer.calculationReducer);
  const dispatch = useDispatch()
  console.log(allowances);


  useEffect(() => {
    dispatch({
      type: 'GET_ALLOWANCE'
    })
  }, [])

  const changeAllowanceRange = () => {
    
    console.log('clicked');

    if (displayedAllowance < 3) {
      setDisplayedAllowance(displayedAllowance + 1)
    }
    else {
      setDisplayedAllowance(1)
    }
  }

  return (
    <div className="container">
      <h2>Welcome, {user.firstname}!</h2>
      <div id='allowanceDiv' onClick={() => changeAllowanceRange()}>
        {displayedAllowance === 1 ?
         <div>${allowances.dailyAllowance}</div> :

          displayedAllowance === 2 ?
           <div>${allowances.weeklyAllowance}</div> :
           
            <div>${allowances.monthlyAllowance}</div>}
      </div>

    </div>
  )
}

// this allows us to use <App /> in index.js
export default UserPage;
