import { Snackbar, Button } from "@material-ui/core"
import React, { useState } from "react"

function MuiSnackbar () {

    const [open, setOpen] = useState(false)
    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <>
        <Button onClick={() => setOpen(true)}>Submit</Button>
        <Snackbar 
        message='Form submitted successfully!'
        autoHideDuration={4000}
        open={open}
        onClose={handleClose}
        />
        </>
    )
}

export default MuiSnackbar

