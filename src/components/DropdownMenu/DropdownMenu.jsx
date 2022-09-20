//This component was used as a template for my drop down menus.
//Not actually being used, but used as information for building instead.

import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Select a category
      </Button>
      <Menu
        id="newExpenseDropDown"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Housing</MenuItem>
        <MenuItem onClick={handleClose}>Transportation</MenuItem>
        <MenuItem onClick={handleClose}>Food</MenuItem>
        <MenuItem onClick={handleClose}>Utilities</MenuItem>
        <MenuItem onClick={handleClose}>Clothing</MenuItem>
        <MenuItem onClick={handleClose}>Medical</MenuItem>
        <MenuItem onClick={handleClose}>Insurance</MenuItem>
        <MenuItem onClick={handleClose}>Household</MenuItem>
        <MenuItem onClick={handleClose}>Lifestyle</MenuItem>
        <MenuItem onClick={handleClose}>Debt</MenuItem>
        <MenuItem onClick={handleClose}>Education</MenuItem>
        <MenuItem onClick={handleClose}>Entertainment</MenuItem>
        <MenuItem onClick={handleClose}>Donations</MenuItem>
      </Menu>
    </div>
  );
}