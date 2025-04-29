import { Link } from "react-router-dom";

const NoMatch = () => {
    return (
        <div>
            <h1>404</h1>
            <h2>This page is not exist</h2>
            <Link to="/">Back homepage</Link>
        </div>
    );
};


export default NoMatch;