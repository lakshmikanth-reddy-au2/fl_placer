import React from 'react'
import {Button} from '@material-ui/core'
export default function CommonButton({handleAddButtonClick, children, className}) {
    return (
        <Button className={className} onClick={handleAddButtonClick}>
            {children}
        </Button>
    )
}
