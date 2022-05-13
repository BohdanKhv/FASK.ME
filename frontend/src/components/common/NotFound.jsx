import './styles/NotFound.css';

const NotFound = ({children, message}) => {
    return (
        <div className="not-found container">
            <div className="not-found-wrapper">
                <p className="code">
                    404
                </p>
                <p className="message title-3">
                    {message}
                </p>
                {children ? children : null}
            </div>
        </div>
    )
}

export default NotFound