import { Link } from "react-router-dom";

const NoMatch = () => {
    return (
        <div className="d-flex align-items-center flex-column justify-content-center">
            <div>
                <i className="bi bi-4-square me-2 display-1"></i>
                <i className="bi bi-0-square me-2 display-1"></i>
                <i className="bi bi-4-square display-1"></i>
            </div>
            <h1 className="mt-2 display-1 fw-medium">Not found!</h1>
            <Link to="/" className="fs-3">
                <i className="bi bi-arrow-bar-left"></i>
                Back homepage
            </Link>
        </div>
    );
};


export default NoMatch;