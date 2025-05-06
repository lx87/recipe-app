import { Link } from "react-router-dom";

const NoMatch = () => {
    return (
        <div className="d-flex align-items-center flex-column justify-content-center">
            <div>
                <i className="bi bi-4-square me-2 fs-1"></i>
                <i className="bi bi-0-square me-2 fs-1"></i>
                <i className="bi bi-4-square fs-1"></i>
            </div>
            <h1 className='mt-2'>Not found!</h1>
            <Link to="/">Back homepage</Link>
        </div>
    );
};


export default NoMatch;