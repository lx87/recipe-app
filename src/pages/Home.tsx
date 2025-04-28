import { useEffect, useState } from 'react';
import { getAllCategories } from '../ts/queryManager';

function Home() {
    const [catalog, setcatalog] = useState([]);
    useEffect(() => {
        getAllCategories().then((data) => {
            setcatalog(data?.categories)
        })
    })

    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-center py-5">
            <h1>Home</h1>
        </div>
    );
}

export default Home