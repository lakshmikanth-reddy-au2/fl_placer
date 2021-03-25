import React from 'react'
import {Button} from '@material-ui/core'
export default function CommonButton({handleAddButtonClick, children}) {
    return (
        <Button onClick={handleAddButtonClick} className="btn-primary">
            {children}
        </Button>
    )
}
