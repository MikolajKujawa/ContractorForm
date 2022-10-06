import React from "react"

import classes from './ErrorModal.module.scss';

const ErrorModal = React.memo(props => {
    return(
        <>
            <div className={classes.backdrop} onClick={props.onClose}/>
            <div className={classes.errorModal}>
                <h2>Error!</h2>
                <p>{props.children}</p>
                <div className={classes.errorModal_actions}>
                    <button type="button" onClick={props.onClose}>
                        OK
                    </button>
                </div>
            </div>
        </>
    )
})

export default ErrorModal