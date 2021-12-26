const Modal = ({message, confirmHandler, declineHandler}) => {
    return (
        <div className="overlay">
            <div className="modal">
                <p className="mb-20">{message}</p>
                <div className="buttons-row mt-10">
                    <button className="btn btn_primary" onClick={confirmHandler}>ОК</button>
                    { declineHandler ?
                        <button 
                            className="btn" 
                            onClick={declineHandler}>Отмена
                        </button> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal;