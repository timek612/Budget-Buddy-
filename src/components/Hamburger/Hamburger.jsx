import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Hamburger.css'

//This component is for my menu dropdown.


const useStyles = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className='goon'>

            <Link className='navLink' to="/newExpense">
              New Expense
            </Link>
            <br />
            <Link className='navLink' to="/individualExpenses">
              Expenses
            </Link>
            <br />
            <Link className='navLink' to="/chart">
              Chart
            </Link>
            <br />
            <Link className='navLink' to="/editProfile">
              Edit Profile
            </Link>
            <br />
            <LogOutButton className="navLink" />

      </List>
      <Divider />
      <List>
        <button className='navLink'>Reset Daily</button>
        <button className='navLink'>Reset Weekly</button>
        <button className='navLink'>Reset Monthly</button>
      </List>
    </div>
  );

  return (
    <div id='hamburgerDiv'>
      {['MENU'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}


