import { useEffect } from 'react';
import { arrowRepeatIcon, closeIcon } from '../../constance/icons';
import './styles/Modal.css';

const Modal = ({children, bodyStyles, headerNone, footerNone, style, modalIsOpen, contentLabel, setModalIsOpen, actionBtnText, onSubmit, actionDangerBtnText, onSubmitDanger, disableClose, isLoading, notCloseOnUpdate, isError, errMsg, isScroll, onClose}) => {

    const closeModal = () => {
        setModalIsOpen(false);
        onClose && onClose();
    }

    const onClickOutside = (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-wrapper')) {
            if(!disableClose || disableClose === false) {
                closeModal();
            } else {
                console.log('modal is disabled');
            }
        }
    }

    useEffect(() => {
        if(!isError) {
            if(!isLoading && !notCloseOnUpdate) {
                closeModal();
            }
        }
    }, [isLoading, isError]);


    useEffect(() => {
        if(modalIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [modalIsOpen])

    return (
        <>
        {modalIsOpen ? (
        <div className="modal-overlay" onMouseDown={onClickOutside} style={style}>
            <div className="modal-wrapper">
                <div className="modal-body">
                    {!headerNone ? (
                    <div className="modal-header">
                        <h3>{contentLabel}</h3>
                        {disableClose ? null : (
                            <div className="btn-icon btn-icon-danger" onClick={closeModal}>
                                {closeIcon}
                            </div>
                        )}
                    </div>
                    ) : null}
                    <div className={`modal-content${isScroll ? ' modal-scroll' : ''}`} style={bodyStyles}>
                        <div className="h-100">
                            {children}
                            {isScroll && isLoading && (
                                <div className="flex align-center mb-1">
                                    <div className="btn-icon modal-spinner">{arrowRepeatIcon}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    {isError && errMsg && (
                        <div className="modal-error">
                            {errMsg}
                        </div>
                    )}
                    {!isScroll && !footerNone && (
                        <div className="modal-footer">
                            {actionDangerBtnText && !isLoading && (
                                <div className="btn btn-outline-danger" onClick={onSubmitDanger}>
                                    {actionDangerBtnText}
                                </div>
                            )}
                            {actionBtnText && (
                                <div className="btn btn-primary" onClick={!isLoading ? onSubmit : null}>
                                    {isLoading ? <div className="modal-spinner">{arrowRepeatIcon}</div> : actionBtnText}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
        ) : null}
        </>
    )
}

export default Modal